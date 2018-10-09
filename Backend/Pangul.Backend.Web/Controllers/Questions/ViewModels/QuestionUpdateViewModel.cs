namespace Pangul.Backend.Web.Controllers.Questions.ViewModels
{
  public class QuestionUpdateViewModel
  {
    public string QuestionId { get; set; }
    public string RowVersion { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public string Topic { get; set; }
    public string[] Tags { get; set; }
  }
}