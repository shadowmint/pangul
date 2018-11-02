using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Pangul.Backend.Web.Configuration.Settings;

namespace Pangul.Backend.Web.Controllers.Frontend
{
  public class FrontendController : Controller
  {
    private readonly ServiceSettings _settings;

    public FrontendController()
    {
      _settings = new ServiceSettings();
    }

    public IActionResult Index()
    {
      var content = System.IO.File.ReadAllText(Path.Combine(_settings.Folders.StaticAssetsFolder, "index.html"));
      return Content(content, "text/html");
    }
  }
}