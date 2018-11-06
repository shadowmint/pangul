namespace Pangul.Backend.Web.Infrastructure.Middleware
{
  public class PangulSpaMiddlewareOptions
  {
    public string[] IgnoreRoutes { get; set; }
    public string StaticFolderRoot { get; set; }
    public string DefaultPath { get; set; }
  }
}