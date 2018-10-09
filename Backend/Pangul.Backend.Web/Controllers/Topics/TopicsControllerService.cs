using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Pangul.Backend.Web.Configuration.Core;
using Pangul.Backend.Web.Controllers.Topics.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Topics;
using Pangul.Services.Services;
using Pangul.Services.Services.Topics;

namespace Pangul.Backend.Web.Controllers.Topics
{
  internal class TopicsControllerService
  {
    private readonly ITopicService _topicService;
    private readonly IUserService _userService;

    public TopicsControllerService(ITopicService topicService, IUserService userService)
    {
      _topicService = topicService;
      _userService = userService;
    }

    public async Task<StandardResponse> DeleteTopic(ClaimsPrincipal identity, TopicDeleteViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity))
        {
          await _topicService.DeleteTopic(db, user, model.TopicId, model.RowVersion);
          await db.SaveChangesAsync();
          return StandardResponse.ForSuccess();
        }
      }
    }

    public async Task<StandardResponse> UpdateTopic(ClaimsPrincipal identity, TopicUpdateViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity))
        {
          var result = await _topicService.UpdateTopic(db, user, new UpdateTopic()
          {
            TopicId = model.TopicId,
            Description = model.Description,
            Icon = PangulStringEncoding.GetBytesFromDataUrl(model.Icon),
            IconType = PangulStringEncoding.GetTypeFromDataUrl(model.Icon),
            RowVersion = model.RowVersion
          });
          await db.SaveChangesAsync();
          return StandardResponse.For(new {result.TopicId});
        }
      }
    }

    public async Task<StandardResponse> GetTopic(ClaimsPrincipal identity, TopicGetViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity))
        {
          var result = !string.IsNullOrWhiteSpace(model.TopicName)
            ? await _topicService.RequireTopic(db, user, model.TopicName)
            : await _topicService.GetTopic(db, user, model.TopicId);
              
          return StandardResponse.For(new TopicViewModel(result));
        }
      }
    }

    public async Task<StandardResponse> Search(ClaimsPrincipal identity, TopicSearchViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity))
        {
          var result = await _topicService.FindTopics(db, user, model.Query, model.Offset, model.Limit);
          return StandardResponse.For(result);
        }
      }
    }
  }
}