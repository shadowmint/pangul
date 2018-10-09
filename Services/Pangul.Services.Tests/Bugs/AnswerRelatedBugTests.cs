using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Infrastructure;
using Pangul.Services.Model;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Bugs
{
  public class AnswerRelatedBugTests
  {
    [Fact]
    public async Task TestNewAnswer__WithTrivialData__CanMapToACustomViewModel()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "Test", "test");
        var answer = await fixture.AnswerHelper.AnswerQuestion("admin", question, "test");
        var answerService = fixture.Container.Resolve<IAnswerService>();

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var meta = await answerService.GetAnswerMetadata(db, user, answer.AnswerId.ToString());
            var model = MapToAnswerMetaResult(meta);
            Assert.NotNull(model);
          }
        }
      }
    }

    private object MapToAnswerMetaResult(AnswerMetaInternalModel model)
    {
      return new
      {
        AnswerId = model.Meta.AnswerId.ToString(),
        AnswerMetaId = model.Meta.AnswerMetaId.ToString(),
        Votes = model.Meta.Votes,
        Global = new
        {
          Votes = model.GlobalMeta.Votes
        },
        RowVersion = PangulRowVersion.GetString(model.Meta.RowVersion),
      };
    }
  }
}