using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Data;
using Pangul.Services.Model;
using Pangul.Services.Services;
using Pangul.Services.Tests.Fixtures;

namespace Pangul.Services.Tests.Helpers
{
  public class UserHelper
  {
    private readonly TestFixture _fixture;

    public UserHelper(TestFixture fixture)
    {
      _fixture = fixture;
    }

    public async Task CreateUser(string username)
    {
      var userService = _fixture.Container.Resolve<IUserService>();
      using (var db = new TestDbContext())
      {
        await userService.Create(db, username);
        await db.SaveChangesAsync();
      }
    }

    public Task<UserContext> Become(PangulDbContext db, string username)
    {
      var userService = _fixture.Container.Resolve<IUserService>();
      return userService.Become(db, username);
    }
  }
}