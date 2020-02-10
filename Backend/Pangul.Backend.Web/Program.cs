using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Pangul.Backend.Web.Configuration.Settings;

namespace Pangul.Backend.Web
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var settings = new ServiceSettings();
      BuildWebHost(settings).Run();
    }

    private static IWebHost BuildWebHost(ServiceSettings settings)
    {
      return WebHost.CreateDefaultBuilder()
        .UseContentRoot(settings.Folders.RootFolder)
        .UseStartup<Startup>()
        .UseUrls(settings.Core.BindAddress)
        .Build();
    }
  }
}