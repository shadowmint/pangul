namespace Pangul.Backend.Web.Controllers.Answers.ViewModels
{
  public class AnswerViewModel
  {
    public string QuestionId { get; set; }
    public string AnswerId { get; set; }
    public string Body { get; set; }
    public int Up { get; set; }
    public int Down { get; set; }
    public bool CanEdit { get; set; }
  }
}