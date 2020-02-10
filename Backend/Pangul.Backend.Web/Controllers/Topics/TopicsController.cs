using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Pangul.Backend.Web.Configuration.Authentication.Policy;
using Pangul.Backend.Web.Controllers.Questions;
using Pangul.Backend.Web.Controllers.Questions.ViewModels;
using Pangul.Backend.Web.Controllers.Topics.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Services.Services;
using Pangul.Services.Services.Questions;
using Pangul.Services.Services.Topics;

namespace Pangul.Backend.Web.Controllers.Topics
{
  [Route("api/[controller]/[action]")]
  public class TopicsController : Controller
  {
    private readonly Logger _logger;
    private readonly TopicsControllerService _service;

    public TopicsController(ITopicService topicService, IUserService userService)
    {
      _logger = LogManager.GetCurrentClassLogger();
      _service = new TopicsControllerService(topicService, userService);
    }

    [HttpPost]
    [Authorize(Policy = PangulUser.PolicyName)]
    public async Task<IActionResult> Get([FromBody] TopicGetViewModel model)
    {
      try
      {
        var response = await _service.GetTopic(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return BadRequest(StandardResponse.ForError());
      }
    }

    [HttpPost]
    [Authorize(Policy = PangulUser.PolicyName)]
    public async Task<IActionResult> Search([FromBody] TopicSearchViewModel model)
    {
      try
      {
        var response = await _service.Search(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [HttpPost]
    [Authorize(Policy = PolicyCanDeleteTopic.PolicyName)]
    public async Task<IActionResult> Delete([FromBody] TopicDeleteViewModel model)
    {
      try
      {
        var response = await _service.DeleteTopic(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [HttpPost]
    [Authorize(Policy = PangulAdmin.PolicyName)]
    public async Task<IActionResult> Update([FromBody] TopicUpdateViewModel model)
    {
      try
      {
        var response = await _service.UpdateTopic(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }
  }
}