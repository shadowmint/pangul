using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCore.Base.WebAuth;
using NLog;
using Pangul.Backend.Web.Controllers.Auth;
using Pangul.Backend.Web.Controllers.Auth.ViewModels;
using Pangul.Backend.Web.Controllers.Users.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Services.Services;
using Pangul.Services.Services.Auth;

namespace Pangul.Backend.Web.Controllers.Users
{
  [Route("api/[controller]/[action]")]
  public class UsersController : Controller
  {
    private readonly UsersControllerService _service;
    private readonly Logger _logger;

    public UsersController(IUserService userService)
    {
      _logger = LogManager.GetCurrentClassLogger();
      _service = new UsersControllerService(userService);
    }

    [HttpPost]
    public async Task<IActionResult> Get([FromBody] GetUserViewModel model)
    {
      try
      {
        var response = await _service.GetUser(User, model, ModelState);
        return response.JsonResult();
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return StandardResponse.Forbidden().JsonResult();
      }
    }
  }
}