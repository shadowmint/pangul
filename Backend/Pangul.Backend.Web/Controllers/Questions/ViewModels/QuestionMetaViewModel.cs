using Pangul.Core.Infrastructure;

namespace Pangul.Backend.Web.Controllers.Questions.ViewModels
{
  public class QuestionMetaViewModel
  {
    public string QuestionMetaId { get; set; }
    public string RowVersion { get; set; }
    public string QuestionId { get; set; }
    public int Votes { get; set; }
    public bool Star { get; set; }
    public QuestionGlobalMetaViewModel Global { get; set; }

    public static QuestionMetaViewModel From(Services.Model.QuestionMetaInternalModel model)
    {
      return new QuestionMetaViewModel()
      {
        QuestionId = model.Meta.QuestionId.ToString(),
        QuestionMetaId = model.Meta.QuestionMetaId.ToString(),
        Votes = model.Meta.Votes,
        Star = model.Meta.Star,
        Global = new QuestionGlobalMetaViewModel()
        {
          Votes = model.GlobalMeta.Votes
        },
        RowVersion = PangulRowVersion.GetString(model.Meta.RowVersion),
      };
    }
  }
}