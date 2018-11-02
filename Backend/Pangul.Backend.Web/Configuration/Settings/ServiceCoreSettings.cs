using Microsoft.Extensions.Configuration;
using Pangul.Backend.Web.Configuration.Infrastructure;

namespace Pangul.Backend.Web.Configuration.Settings
{
  public class ServiceCoreSettings
  {
    public ServiceCoreSettings(IConfiguration configuration)
    {
      BindAddress = configuration.AsCollectionOfString("Core:BindAddress");
    }

    public string[] BindAddress { get; }
  }
}