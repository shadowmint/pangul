using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog;
using ILogger = Microsoft.Extensions.Logging.ILogger;
using LogLevel = Microsoft.Extensions.Logging.LogLevel;

namespace Pangul.Backend.Web.Configuration.Core
{
  public class ServiceLoggerFactory : ILoggerFactory
  {
    public void Dispose()
    {
    }

    public ILogger CreateLogger(string categoryName)
    {
      return new ServiceLogger(LogManager.GetLogger(categoryName));
    }

    public void AddProvider(ILoggerProvider provider)
    {
      // Nah, we handle this in the nlog config
    }

    private class ServiceLogger : ILogger
    {
      private readonly Logger _logger;

      public ServiceLogger(Logger logger)
      {
        _logger = logger;
      }

      public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
      {
        var output = formatter(state, exception);
        var level = ConvertLevel(logLevel);
        _logger.Log(level, output);
      }

      private NLog.LogLevel ConvertLevel(LogLevel logLevel)
      {
        switch (logLevel)
        {
          case LogLevel.Trace:
            return NLog.LogLevel.Trace;
          case LogLevel.Debug:
            return NLog.LogLevel.Debug;
          case LogLevel.Information:
            return NLog.LogLevel.Info;
          case LogLevel.Warning:
            return NLog.LogLevel.Warn;
          case LogLevel.Error:
            return NLog.LogLevel.Error;
          case LogLevel.Critical:
            return NLog.LogLevel.Error;
          case LogLevel.None:
            return NLog.LogLevel.Debug;
          default:
            throw new ArgumentOutOfRangeException(nameof(logLevel), logLevel, null);
        }        
      }

      public bool IsEnabled(LogLevel logLevel)
      {
        return true;
      }

      public IDisposable BeginScope<TState>(TState state)
      {
        return new ServiceLoggerScope();
      }
    }

    private class ServiceLoggerScope : IDisposable
    {
      public void Dispose()
      {
      }
    }
  }
}