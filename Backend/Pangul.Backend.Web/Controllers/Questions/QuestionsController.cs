using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Pangul.Backend.Web.Configuration.Authentication.Policy;
using Pangul.Backend.Web.Controllers.Questions.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Services.Services;
using Pangul.Services.Services.Questions;

namespace Pangul.Backend.Web.Controllers.Questions
{
  [Route("api/[controller]/[action]")]
  [Authorize(Policy = PangulUser.PolicyName)]
  public class QuestionsController : Controller
  {
    private readonly Logger _logger;
    private readonly QuestionsControllerService _service;

    public QuestionsController(IQuestionService questionService, ISearchService searchService, IUserService userService, IPurgeService purgeService, IAnswerService answerService)
    {
      _logger = LogManager.GetCurrentClassLogger();
      _service = new QuestionsControllerService(questionService, searchService, userService, purgeService, answerService);
    }

    [HttpPost]
    [Authorize(Policy = PolicyCanCreateQuestion.PolicyName)]
    public async Task<IActionResult> Add([FromBody] QuestionAddViewModel model)
    {
      try
      {
        var response = await _service.AskQuestion(User, model, ModelState);
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
    public async Task<IActionResult> Update([FromBody] QuestionUpdateViewModel model)
    {
      try
      {
        var response = await _service.UpdateQuestion(User, model, ModelState);
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
    public async Task<IActionResult> UpdateMetadata([FromBody] QuestionMetadataUpdateViewModel model)
    {
      try
      {
        var response = await _service.UpdateQuestionMetadata(User, model, ModelState);
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
    public async Task<IActionResult> Search([FromBody] PerformSearchViewModel model)
    {
      try
      {
        var response = await _service.FindQuestions(User, model, ModelState);
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
    public async Task<IActionResult> Get([FromBody] GetQuestionViewModel model)
    {
      try
      {
        var response = await _service.GetQuestion(User, model, ModelState);
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
    public async Task<IActionResult> GetSummary([FromBody] GetQuestionViewModel model)
    {
      try
      {
        var response = await _service.GetQuestionSummary(User, model, ModelState);
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
    public async Task<IActionResult> Delete([FromBody] DeleteQuestionViewModel model)
    {
      try
      {
        var response = await _service.DeleteQuestion(User, model, ModelState);
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
    public async Task<IActionResult> Metadata([FromBody] GetQuestionViewModel model)
    {
      try
      {
        var response = await _service.GetQuestionMetadata(User, model, ModelState);
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