using System.Linq;
using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Data.Topics;
using Pangul.Services.Services.Topics;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Story
{
  public class TopicUserStoryTests
  {
    [Fact]
    public async Task TestCreatingTopics__OfTheSameName__DoesNotCreateDuplicates()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.TopicHelper.RequireTopic("admin", "one games");
        await fixture.TopicHelper.RequireTopic("admin", "one dev");
        await fixture.TopicHelper.RequireTopic("admin", "one dev");
        await fixture.TopicHelper.RequireTopic("admin", "one games");
        await fixture.TopicHelper.RequireTopic("admin", "one games one");
        
        using (var db = new TestDbContext())
        {
          var all = db.Topic.ToList();
          Assert.Equal(3, all.Count);
        }
      }
    }

    [Fact]
    public async Task TestSearchingForTopics__WhenSuchTopicsExist__ReturnsOnlyMatchingTopics()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.TopicHelper.RequireTopic("admin", "one games");
        await fixture.TopicHelper.RequireTopic("admin", "one dev");
        await fixture.TopicHelper.RequireTopic("admin", "two dev");
        await fixture.TopicHelper.RequireTopic("admin", "one games");
        await fixture.TopicHelper.RequireTopic("admin", "one games one");

        var service = fixture.Container.Resolve<ITopicService>();
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var matches = await service.FindTopics(db, user, "games", 0, 10);
            Assert.Equal(2, matches.IdentityList.Count);
            Assert.False(matches.MoreResults);

            var allMatches = await service.FindTopics(db, user, "*", 0, 10);
            Assert.Equal(4, allMatches.IdentityList.Count); // One duplicate
            Assert.False(allMatches.MoreResults);
          }
        }
      }
    }
  }
}