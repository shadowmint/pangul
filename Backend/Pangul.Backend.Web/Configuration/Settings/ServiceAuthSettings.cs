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
    }

    public string[] ValidAuthReferrers { get; }
  }
}