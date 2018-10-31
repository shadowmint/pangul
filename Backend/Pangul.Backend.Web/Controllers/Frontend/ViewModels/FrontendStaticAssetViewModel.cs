namespace Pangul.Backend.Web.Controllers.Frontend.ViewModels
{
  public class FrontendStaticAssetViewModel
  {
    public bool IsText => Bytes == null;
    public byte[] Bytes { get; set; }
    public string Filename { get; set; }
    public string Content { get; set; }
    public string MimeType { get; set; }
  }
}