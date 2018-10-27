using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Pangul.Backend.Web.Configuration.Authentication.Policy;
using Pangul.Backend.Web.Controllers.Answers.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Services.Services;
using Pangul.Services.Services.Questions;

namespace Pangul.Backend.Web.Controllers.Answers
{
  [Route("api/[controller]/[action]")]
  [Authorize(Policy = PangulUser.PolicyName)]
  public class AnswersController : Controller
  {
    private readonly Logger _logger;
    private readonly AnswersControllerService _service;

    public AnswersController(IUserService userService, IAnswerService answerService, ISearchService searchService, IPurgeService purgeService)
    {
      _logger = LogManager.GetCurrentClassLogger();
      _service = new AnswersControllerService(userService, answerService, searchService, purgeService);
    }

    [HttpPost]
    [Authorize(Policy = PolicyCanCreateQuestion.PolicyName)]
    public async Task<IActionResult> Add([FromBody] AddAnswerViewModel model)
    {
      try
      {
        var response = await _service.AddAnswerToQuestion(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [HttpPost]
    [Authorize(Policy = PangulUser.PolicyName)]
    public async Task<IActionResult> Search([FromBody] SearchAnswersViewModel model)
    {
      try
      {
        var response = await _service.FindAnswers(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }


    [HttpPost]
    [Authorize(Policy = PangulUser.PolicyName)]
    public async Task<IActionResult> Get([FromBody] GetAnswerViewModel model)
    {
      try
      {
        var response = await _service.GetAnswer(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [HttpPost]
    [Authorize(Policy = PangulUser.PolicyName)]
    public async Task<IActionResult> Update([FromBody] UpdateAnswerViewModel model)
    {
      try
      {
        var response = await _service.UpdateAnswer(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [HttpPost]
    [Authorize(Policy = PolicyCanDeleteAnswer.PolicyName)]
    public async Task<IActionResult> Delete([FromBody] DeleteAnswerViewModel model)
    {
      try
      {
        var response = await _service.DeleteAnswer(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [HttpPost]
    [Authorize(Policy = PangulUser.PolicyName)]
    public async Task<IActionResult> Metadata([FromBody] GetAnswerViewModel model)
    {
      try
      {
        var response = await _service.GetAnswerMetadata(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [HttpPost]
    [Authorize(Policy = PolicyCanCreateQuestion.PolicyName)]
    public async Task<IActionResult> UpdateMetadata([FromBody] AnswerMetadataUpdateViewModel model)
    {
      try
      {
        var response = await _service.UpdateAnswerMetadata(User, model, ModelState);
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