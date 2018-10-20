using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure;
using Pangul.Services.Internal.Questions;
using Pangul.Services.Model;
using Pangul.Services.Services.Questions;
using Pangul.Services.Services.Topics;

namespace Pangul.Services.Concrete.Services.Questions
{
  public class QuestionService : IQuestionService, IService
  {
    private readonly ICreateCommandHandler<CreateNewQuestion, Question> _createNewQuestion;
    private readonly IQueryHandler<GetUserQuestions, IEnumerable<IQueryable<Question>>> _getUserQuestions;
    private readonly IQueryHandler<GetQuestion, Question> _getQuestion;
    private readonly IQueryHandler<GetQuestionGlobalMeta, QuestionGlobalMeta> _getQuestionGlobalMeta;
    private readonly ICommandHandler<UpdateQuestion> _updateQuestion;
    private readonly ICommandHandler<UpdateQuestionTopic> _updateQuestionTopic;
    private readonly ICommandHandler<UpdateQuestionMeta> _updateQuestionMeta;
    private readonly IInternalQuestionMetaService _internalMetaService;
    private readonly ITopicService _topicService;

    public QuestionService(ICreateCommandHandler<CreateNewQuestion, Question> createNewQuestion,
      IQueryHandler<GetUserQuestions, IEnumerable<IQueryable<Question>>> getUserQuestions,
      IQueryHandler<GetQuestion, Question> getQuestion,
      IQueryHandler<GetQuestionGlobalMeta, QuestionGlobalMeta> getQuestionGlobalMeta,
      ICommandHandler<UpdateQuestion> updateQuestion,
      ICommandHandler<UpdateQuestionTopic> updateQuestionTopic,
      ICommandHandler<UpdateQuestionMeta> updateQuestionMeta,
      IInternalQuestionMetaService internalMetaService,
      ITopicService topicService)
    {
      _createNewQuestion = createNewQuestion;
      _getUserQuestions = getUserQuestions;
      _getQuestion = getQuestion;
      _updateQuestion = updateQuestion;
      _updateQuestionTopic = updateQuestionTopic;
      _updateQuestionMeta = updateQuestionMeta;
      _getQuestionGlobalMeta = getQuestionGlobalMeta;
      _internalMetaService = internalMetaService;
      _topicService = topicService;
    }

    public async Task<Question> CreateQuestion(PangulDbContext db, UserContext user, CreateNewQuestion model)
    {
      model.UserContext = user;
      model.TopicRef = await _topicService.RequireTopic(db, user, model.Topic);
      return await _createNewQuestion.Execute(db, model);
    }

    public async Task<PaginatedResultSet<Question>> FindQuestionsForUser(PangulDbContext db, UserContext context, int page, int pageSize = 25)
    {
      var querySets = await _getUserQuestions.Execute(db, new GetUserQuestions {UserContext = context});
      return new PaginatedResultSet<Question>(querySets, page, pageSize);
    }

    public Task<Question> GetQuestion(PangulDbContext db, UserContext user, string questionId)
    {
      return _getQuestion.Execute(db, new GetQuestion()
      {
        UserContext = user,
        QuestionId = questionId,
        IgnoreRowVersion = true,
      });
    }

    public async Task<Question> UpdateQuestion(PangulDbContext db, UserContext user, UpdateQuestion model)
    {
      model.UserContext = user;
      model.Derived.Topic = model.Topic == null ? null : await _topicService.RequireTopic(db, user, model.Topic);
      await _updateQuestion.Execute(db, model);
      return await GetQuestion(db, user, model.QuestionId);
    }

    public async Task<QuestionMetaInternalModel> UpdateQuestionMetadata(PangulDbContext db, UserContext user, UpdateQuestionMeta model)
    {
      model.UserContext = user;

      var meta = await _internalMetaService.RequireQuestionMetaForUser(db, user, model.QuestionId);
      var delta = model.Votes - meta.Votes;
      await _updateQuestionMeta.Execute(db, model);

      if (delta != 0)
      {
        await _internalMetaService.UpdateQuestionGlobalMetadata(db, user, new UpdateQuestionGlobalMeta()
        {
          UserContext = user,
          QuestionId = model.QuestionId,
          Votes = delta,
        });
      }

      return await GetQuestionMetadata(db, user, model.QuestionId);
    }

    public async Task UpdateQuestionTopic(PangulDbContext db, UserContext user, UpdateQuestionTopic model)
    {
      model.UserContext = user;
      model.Derived.Topic = await _topicService.RequireTopic(db, user, model.TopicName);
      await _updateQuestionTopic.Execute(db, model);
    }

    public async Task<QuestionMetaInternalModel> GetQuestionMetadata(PangulDbContext db, UserContext user, string questionId)
    {
      var userMetadata = await _internalMetaService.RequireQuestionMetaForUser(db, user, questionId);

      var globalMetadata = await _getQuestionGlobalMeta.Execute(db, new GetQuestionGlobalMeta()
      {
        UserContext = user,
        QuestionId = userMetadata.QuestionId,
      });

      return new QuestionMetaInternalModel()
      {
        Meta = userMetadata,
        GlobalMeta = globalMetadata
      };
    }
  }
}