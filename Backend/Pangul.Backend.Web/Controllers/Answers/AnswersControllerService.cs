using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Pangul.Backend.Web.Configuration.Core;
using Pangul.Backend.Web.Controllers.Answers.ViewModels;
using Pangul.Backend.Web.Controllers.Questions.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Questions;
using Pangul.Services.Model;
using Pangul.Services.Services;
using Pangul.Services.Services.Questions;

namespace Pangul.Backend.Web.Controllers.Answers
{
  public class AnswersControllerService
  {
    private readonly IUserService _userService;
    private readonly IAnswerService _answerService;
    private readonly ISearchService _searchService;

    public AnswersControllerService(IUserService userService, IAnswerService answerService, ISearchService searchService)
    {
      _userService = userService;
      _answerService = answerService;
      _searchService = searchService;
    }

    public async Task<StandardResponse> AddAnswerToQuestion(ClaimsPrincipal identity, AddAnswerViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var answer = await _answerService.CreateAnswer(db, user, model.QuestionId, model.Body);
          await db.SaveChangesAsync();

          return StandardResponse.For(new
          {
            answer.AnswerId
          });
        }
      }
    }

    public async Task<StandardResponse> FindAnswers(ClaimsPrincipal identity, SearchAnswersViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var matches = await _searchService.FindAnswersForQuestion(db, user, model.QuestionId, model.Offset, model.Limit);
          return StandardResponse.For(matches);
        }
      }
    }

    public async Task<StandardResponse> GetAnswer(ClaimsPrincipal identity, GetAnswerViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var answer = await _answerService.GetAnswer(db, user, model.Id);
          return StandardResponse.For(MapToAnswerViewModel(answer));
        }
      }
    }

    public async Task<StandardResponse> UpdateAnswer(ClaimsPrincipal identity, UpdateAnswerViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          await _answerService.UpdateExistingAnswer(db, user, new UpdateAnswer()
          {
            AnswerId = model.AnswerId,
            NewBody = model.Body,
            RowVersion = model.RowVersion
          });
          
          await db.SaveChangesAsync();
          return StandardResponse.ForSuccess();
        }
      }
    }

    private AnswerViewModel MapToAnswerViewModel(Answer answer)
    {
      return new AnswerViewModel()
      {
        AnswerId = answer.AnswerId.ToString(),
        QuestionId = answer.QuestionId.ToString(),
        Body = answer.Body,
        RowVersion = PangulRowVersion.GetString(answer.RowVersion),
        CanEdit = answer.CanEdit,
      };
    }

    public async Task<StandardResponse> UpdateAnswerMetadata(ClaimsPrincipal identity, AnswerMetadataUpdateViewModel model,
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
          var metadata = await _answerService.UpdateAnswerMetadata(db, user, new UpdateAnswerMeta()
          {
            AnswerId = model.AnswerId,
            RowVersion = model.RowVersion,
            Votes = model.Votes,
          });

          await db.SaveChangesAsync();
          return StandardResponse.For(MapToAnswerMetaResult(metadata));
        }
      }
    }

    public async Task<StandardResponse> GetAnswerMetadata(ClaimsPrincipal identity, GetAnswerViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var meta = await _answerService.GetAnswerMetadata(db, user, model.Id);
          return StandardResponse.For(MapToAnswerMetaResult(meta));
        }
      }
    }

    private AnswerMetaViewModel MapToAnswerMetaResult(AnswerMetaInternalModel model)
    {
      return new AnswerMetaViewModel()
      {
        AnswerId = model.Meta.AnswerId.ToString(),
        AnswerMetaId = model.Meta.AnswerMetaId.ToString(),
        Votes = model.Meta.Votes,
        Global = new AnswerGlobalMetaViewModel()
        {
          Votes = model.GlobalMeta.Votes
        },
        RowVersion = PangulRowVersion.GetString(model.Meta.RowVersion),
      };
    }
  }
}
