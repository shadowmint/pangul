using System.Threading.Tasks;
using Autofac;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Services;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Story
{
  public class AuthenticationUserStoryTests
  {
    [Fact]
    public async Task TestLogin__WithExplicitlyCreatedUser__CanLoginSuccessfully()
    {
      using (var fixture = new TestFixture())
      {
        var userService = fixture.Container.Resolve<IUserService>();

        using (var db = new TestDbContext())
        {
          await userService.Create(db, "admin");
          await db.SaveChangesAsync();
        }

        using (var db = new TestDbContext())
        {
          using (var user = await userService.Become(db, "admin"))
          {
            Assert.Equal("admin", user.Login.Username);
          }
        }
      }
    }

    [Fact]
    public async Task TestLogin__WithFixtureCreatedUser__CanLoginSuccessfully()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            Assert.Equal("admin", user.Login.Username);
          }
        }
      }
    }

    [Fact]
    public async Task TestLogin__WithNoSuchUser__CannotLogin()
    {
      using (var fixture = new TestFixture())
      {
        var userService = fixture.Container.Resolve<IUserService>();
        await Assert.ThrowsAsync<PangulCommandFailedException>(async () =>
        {
          using (var db = new TestDbContext())
          {
            using (var user = await userService.Become(db, "admin"))
            {
              Assert.Equal("admin", user.Login.Username);
            }
          }
        });
      }
    }
  }
}