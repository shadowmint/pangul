using System.IO;

namespace Pangul.Backend.Web.Configuration.Settings
{
  public class ServiceFolderSettings
  {
    public ServiceFolderSettings()
    {
      RootFolder = Directory.GetCurrentDirectory();
      StaticAssetsFolder = Path.Combine(RootFolder, "wwwroot");
    }

    public string StaticAssetsFolder { get; }

    public string RootFolder { get; }
  }
}