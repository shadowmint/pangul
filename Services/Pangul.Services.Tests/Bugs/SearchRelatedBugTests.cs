using System.Threading.Tasks;
using Autofac;
using Pangul.Services.Internal.Search;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Bugs
{
  public class SearchRelatedBugTests
  {
    [Fact]
    public async Task TestSearchAllQuestionsAndTopics__AcrossMultipleTopics__ReturnsAllResults()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.QuestionHelper.CreateQuestion("admin", "question1", "body1", "topic1");
        await fixture.QuestionHelper.CreateQuestion("admin", "question2", "body2", "topic2");

        var service = fixture.Container.Resolve<IInternalSearchService>();
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var matches = await service.SearchQuestions(db, user, "topic:* *", 0, 10);
            Assert.Equal(2, matches.IdentityList.Count);
          }
        }
      }
    }
    
    [Fact]
    public async Task TestSearchAllQuestions__WithQuestionsInManyTopics__ReturnsAllResultsFromSingleTopic()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.QuestionHelper.CreateQuestion("admin", "question1", "body1", "topic1");
        await fixture.QuestionHelper.CreateQuestion("admin", "question2", "body2", "topic1");
        await fixture.QuestionHelper.CreateQuestion("admin", "question3", "body3", "topic2");
        await fixture.QuestionHelper.CreateQuestion("admin", "question4", "body4", "topic3");

        var service = fixture.Container.Resolve<IInternalSearchService>();
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var matches = await service.SearchQuestions(db, user, "topic:topic1 *", 0, 10);
            Assert.Equal(2, matches.IdentityList.Count);
          }
        }
      }
    }
  }
}