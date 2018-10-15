namespace Pangul.Backend.Web.Controllers.Answers.ViewModels
{
  public class AnswerViewModel
  {
    public string QuestionId { get; set; }
    public string AnswerId { get; set; }
    public string Body { get; set; }
    public string RowVersion { get; set; }
    public bool CanEdit { get; set; }
  }
}
