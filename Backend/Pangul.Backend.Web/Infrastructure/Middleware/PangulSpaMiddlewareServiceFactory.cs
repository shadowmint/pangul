using System;

namespace Pangul.Backend.Web.Infrastructure.Middleware
{
  internal class PangulSpaMiddlewareServiceFactory
  {
    private static Lazy<PangulSpaMiddlewareService> _instance = new Lazy<PangulSpaMiddlewareService>();

    public static PangulSpaMiddlewareService GetStaticFileService()
    {
      return _instance.Value;
    }
  }
}