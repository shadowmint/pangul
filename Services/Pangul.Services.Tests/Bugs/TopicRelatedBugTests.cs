using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Questions;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Bugs
{
  public class TopicRelatedBugTests
  {
    [Fact]
    public async Task TestMovingQuestion__WhenThNewTopicDoesNotExist__ReturnsTheFullTopicModel()
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
            await questionService.UpdateQuestion(db, user, new UpdateQuestion()
            {
              QuestionId = question.QuestionId.ToString(),
              RowVersion = PangulRowVersion.GetString(question.RowVersion),
              Body = question.Body,
              Title = question.Title,
              Topic = "newTopic"
            });

            await db.SaveChangesAsync();

            var questionFetched = await questionService.GetQuestion(db, user, question.QuestionId.ToString());
            Assert.Equal("newtopic", questionFetched.Topic.Name);
          }
        }
      }
    }
  }
}