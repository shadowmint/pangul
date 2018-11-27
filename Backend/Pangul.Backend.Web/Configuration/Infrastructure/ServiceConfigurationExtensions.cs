using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using NLog;
using Pangul.Backend.Web.Configuration.Settings;

namespace Pangul.Backend.Web.Configuration.Infrastructure
{
  public static class ServiceConfigurationExtensions
  {
    public static string ValueOrDefault(this IConfiguration conf, string key, string defaultValue)
    {
      if (conf[key] == null) return defaultValue;
      return conf[key];
    }

    public static bool AsBooleanOrDefault(this IConfiguration conf, string key, bool defaultValue)
    {
      if (conf[key] == null) return defaultValue;
      return bool.Parse(conf[key]);
    }

    public static LogLevel AsLogLevelOrDefault(this IConfiguration conf, string key, LogLevel defaultValue)
    {
      if (conf[key] == null) return defaultValue;
      return LogLevel.FromString(conf[key]);
    }

    public static string[] AsCollectionOfString(this IConfiguration conf, string key)
    {
      var section = conf.GetSection(key);
      if (section == null) return new string[0];

      var values = section.AsEnumerable()?.ToArray();
      if (values == null) return new string[0];

      return values.Select(i => i.Value == null ? "" : i.Value.Trim()).Where(i => !string.IsNullOrEmpty(i)).ToArray();
    }

    public static T AsEnumOrDefault<T>(this IConfiguration conf, string key, T defaultValue) where T : struct
    {
      if (conf[key] == null) return defaultValue;
      if (Enum.TryParse<T>(conf[key], out var value))
      {
        return value;
      }
      return defaultValue;
    }
  }
}