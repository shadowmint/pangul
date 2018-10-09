using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Internal.Questions;
using Pangul.Services.Model;
using Pangul.Services.Services.Questions;

namespace Pangul.Services.Concrete.Services.Questions
{
  public class AnswerService : IAnswerService, IService
  {
    private readonly IQueryHandler<GetAnswer, Answer> _getAnswer;
    private readonly IQueryHandler<GetAnswerGlobalMeta, AnswerGlobalMeta> _getAnswerGlobalMeta;
    private readonly ICreateCommandHandler<CreateNewAnswer, Answer> _createNewAnswer;
    private readonly ICommandHandler<UpdateAnswerMeta> _updateAnswerMeta;
    private readonly ICommandHandler<UpdateAnswer> _updateAnswer;
    private readonly IInternalQuestionMetaService _internalMetaService;

    public AnswerService(
      IQueryHandler<GetAnswer, Answer> getAnswer,
      IQueryHandler<GetAnswerGlobalMeta, AnswerGlobalMeta> getAnswerGlobalMeta,
      ICreateCommandHandler<CreateNewAnswer, Answer> createNewAnswer,
      ICommandHandler<UpdateAnswerMeta> updateAnswerMeta,
      ICommandHandler<UpdateAnswer> updateAnswer,
      IInternalQuestionMetaService internalMetaService)
    {
      _createNewAnswer = createNewAnswer;
      _getAnswer = getAnswer;
      _getAnswerGlobalMeta = getAnswerGlobalMeta;
      _updateAnswerMeta = updateAnswerMeta;
      _updateAnswer = updateAnswer;
      _internalMetaService = internalMetaService;
    }

    public async Task<Answer> CreateAnswer(PangulDbContext db, UserContext user, string questionId, string answerBody)
    {
      return await _createNewAnswer.Execute(db, new CreateNewAnswer()
      {
        UserContext = user,
        QuestionId = questionId,
        Body = answerBody,
      });
    }

    public async Task<AnswerMetaInternalModel> GetAnswerMetadata(PangulDbContext db, UserContext user, string questionId)
    {
      var userMetadata = await _internalMetaService.RequireAnswerMetaForUser(db, user, questionId);

      var globalMetadata = await _getAnswerGlobalMeta.Execute(db, new GetAnswerGlobalMeta()
      {
        UserContext = user,
        AnswerId = userMetadata.AnswerId,
      });

      return new AnswerMetaInternalModel()
      {
        Meta = userMetadata,
        GlobalMeta = globalMetadata
      };
    }

    public async Task<AnswerMetaInternalModel> UpdateAnswerMetadata(PangulDbContext db, UserContext user, UpdateAnswerMeta model)
    {
      model.UserContext = user;

      var meta = await _internalMetaService.RequireAnswerMetaForUser(db, user, model.AnswerId);

      if (meta.Votes != model.Votes)
      {
        await _updateAnswerMeta.Execute(db, model);

        await _internalMetaService.UpdateAnswerGlobalMetadata(db, user, new UpdateAnswerGlobalMeta()
        {
          UserContext = user,
          AnswerId = model.AnswerId,
          Votes = model.Votes
        });
      }

      return await GetAnswerMetadata(db, user, model.AnswerId);
    }

    public async Task<Answer> UpdateExistingAnswer(PangulDbContext db, UserContext user, UpdateAnswer model)
    {
      model.UserContext = user;
      await _updateAnswer.Execute(db, model);
      return await GetAnswer(db, user, model.AnswerId);
    }

    public async Task<Answer> GetAnswer(PangulDbContext db, UserContext user, string answerId)
    {
      return await _getAnswer.Execute(db, new GetAnswer()
      {
        UserContext = user,
        AnswerId = answerId,
        IgnoreRowVersion = true
      });
    }
  }
}