namespace Pangul.Backend.Web.Controllers.Questions.ViewModels
{
  public class QuestionMetadataUpdateViewModel
  {
    public string? QuestionId { get; set; }
    public int Votes { get; set; }
    public bool Star { get; set; }
    public string? RowVersion { get; set; }
  }
}