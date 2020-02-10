using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Pangul.Backend.Web.Configuration.Infrastructure;

namespace Pangul.Backend.Web.Configuration.Settings
{
  public class ServiceAuthSettings
  {
    public ServiceAuthSettings(IConfiguration configuration)
    {
      ValidAuthReferrers = configuration
        .AsCollectionOfString("Auth:ValidAuthReferers")
        .Select(i => i.TrimEnd('/'))
        .ToArray();

      AuthProvider = configuration.AsEnumOrDefault("Auth:AuthenticationProvider", AuthProviderType.Test);
      AuthProviderConfig = configuration.ValueOrDefault("Auth:AuthenticationConfig", "");
    }

    public string AuthProviderConfig { get; }

    public AuthProviderType AuthProvider { get; }

    public string[] ValidAuthReferrers { get; }

    public enum AuthProviderType
    {
      Test
    }
  }
}