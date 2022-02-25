namespace Pangul.Backend.Web.Controllers.Answers.ViewModels
{
  public class SearchAnswersViewModel
  {
    public string? QuestionId { get; set; }
    public int Limit { get; set; }
    public int Offset { get; set; }
  }
}