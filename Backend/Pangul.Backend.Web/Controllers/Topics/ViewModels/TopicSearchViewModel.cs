namespace Pangul.Backend.Web.Controllers.Topics.ViewModels
{
  public class TopicSearchViewModel
  {
    public string Query { get; set; }
    public int Offset { get; set; }
    public int Limit { get; set; }
  }
}