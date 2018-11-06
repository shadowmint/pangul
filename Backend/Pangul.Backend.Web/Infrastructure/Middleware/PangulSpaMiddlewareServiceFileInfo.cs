using System;

namespace Pangul.Backend.Web.Infrastructure.Middleware
{
  internal class PangulSpaMiddlewareServiceFileInfo
  {
    public string Filename { get; set; } = "index.html";
    public string MineType { get; set; } = "text/html";
    public byte[] Bytes { get; set; } = { };
    public DateTimeOffset Created { get; set; }
  }
}