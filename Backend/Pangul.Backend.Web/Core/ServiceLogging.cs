using NCore.Base.Log;
using NLog;
using Pangul.Backend.Web.Configuration.Settings;

namespace Pangul.Backend.Web.Configuration.Core
{
  public class ServiceLogging : DefaultConfigBuilder
  {
    private readonly ServiceSettings _settings;

    public ServiceLogging()
    {
      _settings = new ServiceSettings();
    }

    public override string ApplicationLogFolder => _settings.Logging.LogFolder;
    public override bool EnableFileLogging => _settings.Logging.EnableFileLogging;
    public override bool EnableDebugLogging => _settings.Logging.EnableDebugLogging;
    public override bool EnableConsoleLogging => _settings.Logging.EnableConsoleLogging;
    public override LogLevel FileLogLevel => _settings.Logging.FileLogLevel;
    public override LogLevel ConsoleLogLevel => _settings.Logging.ConsoleLogLevel;
    public override LogLevel DebugLogLevel => _settings.Logging.DebugLogLevel;
  }
}