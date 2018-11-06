using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NCore.Optional;
using Pangul.Backend.Web.Controllers.Questions.ViewModels;
using Pangul.Backend.Web.Core;
using Pangul.Backend.Web.Infrastructure;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Core.Data.Questions;
using Pangul.Core.Data.Topics;
using Pangul.Services.Services;
using Pangul.Services.Services.Questions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Questions;

namespace Pangul.Backend.Web.Controllers.Questions
{
  internal class QuestionsControllerService
  {
    private readonly IQuestionService _questionService;
    private readonly ISearchService _searchService;
    private readonly IUserService _userService;
    private readonly IPurgeService _purgeService;
    private readonly IAnswerService _answerService;

    public QuestionsControllerService(IQuestionService questionService, ISearchService searchService, IUserService userService,
      IPurgeService purgeService, IAnswerService answerService)
    {
      _questionService = questionService;
      _searchService = searchService;
      _userService = userService;
      _purgeService = purgeService;
      _answerService = answerService;
    }

    public async Task<StandardResponse> AskQuestion(ClaimsPrincipal identity, QuestionAddViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var question = await _questionService.CreateQuestion(db, user, new CreateNewQuestion()
          {
            Title = model.Title,
            Body = model.Body, Tags = model.Tags,
            Topic = model.Topic ?? Topic.DefaultTopic
          });
          await db.SaveChangesAsync();
          return StandardResponse.For(new
          {
            question.QuestionId
          });
        }
      }
    }

    public async Task<StandardResponse> FindQuestions(ClaimsPrincipal identity, PerformSearchViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var result = await _searchService.SearchForQuestions(db, user, model.Query, model.Offset, model.Limit);
          return StandardResponse.For(result);
        }
      }
    }

    public async Task<StandardResponse> GetQuestion(ClaimsPrincipal identity, GetQuestionViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var question = await _questionService.GetQuestion(db, user, model.Id);
          return StandardResponse.For(QuestionViewModel.From(question));
        }
      }
    }

    public async Task<StandardResponse> DeleteQuestion(ClaimsPrincipal identity, DeleteQuestionViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var transaction = new ServiceDb().WithTransaction())
      {
        using (var user = await _userService.Become(transaction.Db, identity, null))
        {
          await _purgeService.PurgeExistingQuestion(transaction.Db, user, model.Id, new BackupConfig());
          await transaction.Db.SaveChangesAsync();
          return StandardResponse.ForSuccess();
        }
      }
    }

    public async Task<StandardResponse> GetQuestionMetadata(ClaimsPrincipal identity, GetQuestionViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var meta = await _questionService.GetQuestionMetadata(db, user, model.Id);
          return StandardResponse.For(QuestionMetaViewModel.From(meta));
        }
      }
    }

    public async Task<StandardResponse> UpdateQuestion(ClaimsPrincipal identity, QuestionUpdateViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity))
        {
          await _questionService.UpdateQuestion(db, user, new UpdateQuestion()
          {
            QuestionId = model.QuestionId,
            RowVersion = model.RowVersion,
            Body = model.Body,
            Tags = model.Tags ?? new string[] { },
            Title = model.Title,
            Topic = model.Topic
          });

          await db.SaveChangesAsync();

          var question = await _questionService.GetQuestion(db, user, model.QuestionId);
          return StandardResponse.For(QuestionViewModel.From(question));
        }
      }
    }

    public async Task<StandardResponse> UpdateQuestionMetadata(ClaimsPrincipal identity, QuestionMetadataUpdateViewModel model,
      ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var question = await _questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
          {
            QuestionId = model.QuestionId,
            RowVersion = model.RowVersion,
            Votes = model.Votes,
            Star = model.Star
          });

          await db.SaveChangesAsync();
          return StandardResponse.For(QuestionMetaViewModel.From(question));
        }
      }
    }

    public async Task<StandardResponse> GetQuestionSummary(ClaimsPrincipal identity, GetQuestionViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var question = await _questionService.GetQuestion(db, user, model.Id);
          var results = await _searchService.FindAnswersForQuestion(db, user, model.Id, 0, 1);

          var bestAnswer = results.HasResults
            ? Option.Some(await _answerService.GetAnswer(db, user, results.IdentityList[0].ToString()))
            : Option.None<Answer>();

          return StandardResponse.For(QuestionSummaryViewModel.From(question, bestAnswer));
        }
      }
    }
  }
}