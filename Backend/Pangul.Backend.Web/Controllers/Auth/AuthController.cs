using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NCore.Base.WebAuth;
using NLog;
using Pangul.Backend.Web.Configuration.Authentication.Identity;
using Pangul.Backend.Web.Controllers.Auth.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Services.Services;
using Pangul.Services.Services.Auth;

namespace Pangul.Backend.Web.Controllers.Auth
{
  [Route("api/[controller]/[action]")]
  public class AuthController : Controller
  {
    private readonly IAuthService _auth;
    private readonly AuthControllerService _service;
    private readonly Logger _logger;

    public AuthController(IAuthService auth, IPangulAuthService pangulAuthService)
    {
      _auth = auth;
      _logger = LogManager.GetCurrentClassLogger();
      _service = new AuthControllerService(pangulAuthService, auth);
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginViewModel model)
    {
      try
      {
        var response = await _service.Login(HttpContext, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [Authorize]
    [HttpPost]
    public IActionResult Claims()
    {
      try
      {
        var response = _service.GetClaims(User);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.ForError().JsonResult();
      }
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Logout()
    {
      try
      {
        await _auth.SignOutAsync(HttpContext);
        return Json(new {Success = true});
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return Json(new {Success = false});
      }
    }
  }
}