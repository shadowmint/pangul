using System;
using Microsoft.Extensions.Configuration;
using NLog;
using Pangul.Backend.Web.Configuration.Infrastructure;

namespace Pangul.Backend.Web.Configuration.Settings
{
  public class ServiceLogSettings
  {
    public ServiceLogSettings(IConfiguration configuration)
    {
      LogFolder = configuration.ValueOrDefault("Logging:LogFolder", "log");
      EnableFileLogging = configuration.AsBooleanOrDefault("Logging:EnableFileLogging", true);
      EnableConsoleLogging = configuration.AsBooleanOrDefault("Logging:EnableConsoleLogging", true);
      EnableDebugLogging = configuration.AsBooleanOrDefault("Logging:EnableDebugLogging", false);
      FileLogLevel = configuration.AsLogLevelOrDefault("Logging:FileLogLevel", LogLevel.Warn);
      ConsoleLogLevel = configuration.AsLogLevelOrDefault("Logging:ConsoleLogLevel", LogLevel.Warn);
      DebugLogLevel = configuration.AsLogLevelOrDefault("Logging:DebugLogLevel", LogLevel.Debug);
    }

    public string LogFolder { get; }
    public bool EnableFileLogging { get; }
    public bool EnableDebugLogging { get; }
    public bool EnableConsoleLogging { get; }
    public LogLevel FileLogLevel { get; }
    public LogLevel ConsoleLogLevel { get; }
    public LogLevel DebugLogLevel { get; }
  }
}