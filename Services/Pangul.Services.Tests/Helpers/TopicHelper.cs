using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Data.Topics;
using Pangul.Services.Services.Topics;
using Pangul.Services.Tests.Fixtures;

namespace Pangul.Services.Tests.Helpers
{
  public class TopicHelper
  {
    private readonly TestFixture _fixture;

    public TopicHelper(TestFixture fixture)
    {
      _fixture = fixture;
    }

    public async Task<Topic> RequireTopic(string username, string topic, string description = "Some topic")
    {
      var service = _fixture.Container.Resolve<ITopicService>();
      using (var db = new TestDbContext())
      {
        using (var user = await _fixture.UserHelper.Become(db, username))
        {
          var rtn = await service.RequireTopic(db, user, topic);
          rtn.Description = description;
          await db.SaveChangesAsync();
          return rtn;
        }
      }
    }
  }
}