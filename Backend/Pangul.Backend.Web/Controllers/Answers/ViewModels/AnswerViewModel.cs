using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;

namespace Pangul.Backend.Web.Controllers.Answers.ViewModels
{
  public class AnswerViewModel
  {
    public string UserId { get; set; }
    public string QuestionId { get; set; }
    public string AnswerId { get; set; }
    public string Body { get; set; }
    public string RowVersion { get; set; }
    public bool CanEdit { get; set; }

    public static AnswerViewModel From(Answer answer)
    {
      return new AnswerViewModel()
      {
        UserId = answer.UserId.ToString(),
        QuestionId = answer.QuestionId.ToString(),
        AnswerId = answer.AnswerId.ToString(),
        Body = answer.Body,
        CanEdit = answer.CanEdit,
        RowVersion = PangulRowVersion.GetString(answer.RowVersion)
      };
    }
  }
}
