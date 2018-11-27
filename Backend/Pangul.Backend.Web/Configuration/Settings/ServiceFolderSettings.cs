using System;
using System.IO;
using System.Reflection;
using Pangul.Backend.Web.Infrastructure.Errors;

namespace Pangul.Backend.Web.Configuration.Settings
{
  public class ServiceFolderSettings
  {
    public ServiceFolderSettings()
    {
      BinaryFolder = Directory.GetParent(Assembly.GetExecutingAssembly().Location).FullName;
      RootFolder = FindAppsettings();
      StaticAssetsFolder = Path.Combine(RootFolder, "wwwroot");
      StaticAssetsFallbackFolder = Path.Combine(BinaryFolder, "wwwroot");
      Directory.SetCurrentDirectory(RootFolder);
    }

    public string StaticAssetsFolder { get; }

    public string StaticAssetsFallbackFolder { get; }

    public string BinaryFolder { get; }
    
    public string RootFolder { get; }

    private static string FindAppsettings()
    {
      var here = Directory.GetCurrentDirectory();
      while (here != null)
      {
        var targetPath = Path.Combine(here, "appsettings.json");
        if (File.Exists(targetPath))
        {
          break;
        }

        here = Directory.GetParent(here)?.FullName;
      }

      if (here == null)
      {
        throw new WebRuntimeException(WebRuntimeErrorType.InvalidConfiguration, "Unable to find appsettings.json in path");
      }

      return here;
    }
  }
}