using System;

namespace Pangul.Backend.Web.Infrastructure.Middleware
{
  internal static class PangulSpaMiddlewareServiceFactory
  {
    private static readonly Lazy<PangulSpaMiddlewareService> _instance = new Lazy<PangulSpaMiddlewareService>();

    public static PangulSpaMiddlewareService GetStaticFileService()
    {
      return _instance.Value;
    }
  }
}