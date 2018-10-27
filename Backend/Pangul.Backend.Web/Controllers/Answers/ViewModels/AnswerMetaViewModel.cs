using Pangul.Core.Infrastructure;
using Pangul.Services.Model;

namespace Pangul.Backend.Web.Controllers.Answers.ViewModels
{
  internal class AnswerMetaViewModel
  {
    public string RowVersion { get; set; }
    public AnswerGlobalMetaViewModel Global { get; set; }
    public int Votes { get; set; }
    public string AnswerMetaId { get; set; }
    public string AnswerId { get; set; }

    public static AnswerMetaViewModel From(AnswerMetaInternalModel model)
    {
      return new AnswerMetaViewModel()
      {
        AnswerId = model.Meta.AnswerId.ToString(),
        AnswerMetaId = model.Meta.AnswerMetaId.ToString(),
        Votes = model.Meta.Votes,
        Global = new AnswerGlobalMetaViewModel()
        {
          Votes = model.GlobalMeta.Votes
        },
        RowVersion = PangulRowVersion.GetString(model.Meta.RowVersion)
      };
    }
  }
}