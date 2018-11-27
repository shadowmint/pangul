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
      var path = Path.Combine(_settings.Folders.StaticAssetsFolder, "index.html");
      if (!System.IO.File.Exists(path))
      {
        path = Path.Combine(_settings.Folders.StaticAssetsFallbackFolder, "index.html");
      }

      var content = System.IO.File.ReadAllText(path);
      return Content(content, "text/html");
    }
  }
}