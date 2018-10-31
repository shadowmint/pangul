using System.IO;
using Microsoft.AspNetCore.Mvc;
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
      return File(Path.Combine(_settings.Folders.StaticAssetsFolder, "index.html"), "text/html");
    }
  }
}