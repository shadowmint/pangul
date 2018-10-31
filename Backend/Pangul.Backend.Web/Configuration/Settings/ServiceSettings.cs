using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace Pangul.Backend.Web.Configuration.Settings
{
  public class ServiceSettings
  {
    public ServiceDbSettings Db => _db.Value;

    public ServiceLogSettings Logging => _logging.Value;

    public ServiceAuthSettings Auth => _auth.Value;

    public ServiceFolderSettings Folders => StaticFolders.Value;

    private readonly Lazy<ServiceDbSettings> _db = new Lazy<ServiceDbSettings>(() => new ServiceDbSettings(Config.Value));

    private readonly Lazy<ServiceLogSettings> _logging = new Lazy<ServiceLogSettings>(() => new ServiceLogSettings(Config.Value));

    private readonly Lazy<ServiceAuthSettings> _auth = new Lazy<ServiceAuthSettings>(() => new ServiceAuthSettings(Config.Value));

    private static readonly Lazy<ServiceFolderSettings> StaticFolders = new Lazy<ServiceFolderSettings>(() => new ServiceFolderSettings());

    private static readonly Lazy<IConfiguration> Config = new Lazy<IConfiguration>(() =>
    {
      var builder = new ConfigurationBuilder()
        .SetBasePath(StaticFolders.Value.RootFolder)
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables();

      return builder.Build();
    });
  }
}