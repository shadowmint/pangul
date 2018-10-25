using System.Collections.Generic;
using System.Linq;
using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;

namespace Pangul.Backend.Web.Controllers.Questions.ViewModels
{
  public class QuestionViewModel
  {
    public string QuestionId { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public string UserId { get; set; }
    public IList<string> Tags { get; set; }
    public string RowVersion { get; set; }
    public string Topic { get; set; }

    public static QuestionViewModel From(Question question)
    {
      return new QuestionViewModel()
      {
        UserId = question.UserId.ToString(),
        QuestionId = question.QuestionId.ToString(),
        Title = question.Title,
        Tags = question.Tags.Select(i => i.Tag).ToList(),
        Body = question.Body,
        RowVersion = PangulRowVersion.GetString(question.RowVersion),
        Topic = question.Topic.Name
      };
    }
  }
}