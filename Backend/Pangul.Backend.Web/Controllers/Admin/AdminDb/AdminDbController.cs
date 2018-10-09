using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Pangul.Backend.Web.Configuration.Authentication.Policy;

namespace Pangul.Backend.Web.Controllers.Admin.AdminDb
{
  [Route("api/[controller]/[action]")]
  [Authorize(Policy = PangulAdminDatabase.PolicyName)]
  public class AdminDbController : Controller
  {
    private AdminDbService _serivce;
    private readonly Logger _logger;

    public AdminDbController()
    {
      _serivce = new AdminDbService();
      _logger = LogManager.GetCurrentClassLogger();
    }

    [HttpPost]
    public async Task<JsonResult> MigrationStatus()
    {
      try
      {
        var result = await _serivce.GetMigrationStatus();
        return Json(new {Success = true, Data = result});
      }
      catch (Exception error)
      {
        _logger.Error(error);
        return Json(new {Success = false});
      }
    }
  }
}