using System;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Internal.Questions;
using Pangul.Services.Model;

namespace Pangul.Services.Concrete.Internal.Questions
{
  public class InternalQuestionMetaService : IInternalQuestionMetaService, IService
  {
    private readonly ICreateCommandHandler<CreateNewQuestionMeta, QuestionMeta> _createQuestionMeta;
    private readonly ICommandHandler<UpdateQuestionGlobalMeta> _updateQuestionGlobalMeta;
    private readonly ICreateCommandHandler<CreateNewAnswerMeta, AnswerMeta> _createAnswerMeta;
    private readonly ICommandHandler<UpdateAnswerGlobalMeta> _updateAnswerGlobalMeta;

    public InternalQuestionMetaService(
      ICreateCommandHandler<CreateNewQuestionMeta, QuestionMeta> createQuestionMeta,
      ICommandHandler<UpdateQuestionGlobalMeta> updateQuestionGlobalMeta,
      ICreateCommandHandler<CreateNewAnswerMeta, AnswerMeta> createAnswerMeta,
      ICommandHandler<UpdateAnswerGlobalMeta> updateAnswerGlobalMeta)
    {
      _createQuestionMeta = createQuestionMeta;
      _updateQuestionGlobalMeta = updateQuestionGlobalMeta;
      _createAnswerMeta = createAnswerMeta;
      _updateAnswerGlobalMeta = updateAnswerGlobalMeta;
    }

    public Task<QuestionMeta> RequireQuestionMetaForUser(PangulDbContext db, UserContext user, string questionId)
    {
      return _createQuestionMeta.Execute(db, new CreateNewQuestionMeta()
      {
        UserContext = user,
        QuestionId = questionId,
        SkipIfExisting = true
      });
    }

    public Task UpdateQuestionGlobalMetadata(PangulDbContext db, UserContext user, UpdateQuestionGlobalMeta model)
    {
      model.UserContext = user;
      return _updateQuestionGlobalMeta.Execute(db, model);
    }

    public Task<AnswerMeta> RequireAnswerMetaForUser(PangulDbContext db, UserContext user, string answerId)
    {
      return _createAnswerMeta.Execute(db, new CreateNewAnswerMeta()
      {
        UserContext = user,
        AnswerId = answerId,
        SkipIfExisting = true
      });
    }

    public Task UpdateAnswerGlobalMetadata(PangulDbContext db, UserContext user, UpdateAnswerGlobalMeta model)
    {
      model.UserContext = user;
      return _updateAnswerGlobalMeta.Execute(db, model);
    }
  }
}