using System.Threading.Tasks;
using Autofac;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Bugs
{
  public class RowVersionRelatedBugTests
  {
    [Fact]
    public async Task TestCreatingQuestion__WithTrivialData__CreatesMetadataWithRowVersion()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "Test", "test");
       
        var questionService = fixture.Container.Resolve<IQuestionService>();
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var questionData = await questionService.GetQuestion(db, user, question.QuestionId.ToString());
            var meta = await questionService.GetQuestionMetadata(db, user, question.QuestionId.ToString());
            Assert.NotEmpty(meta.Meta.RowVersion);
          }
        }
      }
    }
  }
}