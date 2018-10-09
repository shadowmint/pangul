namespace Pangul.Backend.Web.Controllers.Questions.ViewModels
{
  public class AnswerMetadataUpdateViewModel
  {
    public string AnswerId { get; set; }
    public int Votes { get; set; }
    public string RowVersion { get; set; }
  }
}