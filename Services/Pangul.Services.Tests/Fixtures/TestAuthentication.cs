using System.Threading.Tasks;

using Pangul.Services.Services;
using Pangul.Services.Services.Auth;

namespace Pangul.Services.Tests.Fixtures
{
  public class TestAuthentication : IPangulAuthProvider
  {
    private readonly IUserService _userService;

    public TestAuthentication(IUserService userService)
    {
      _userService = userService;
    }

    public async Task<bool> TryAuthorize<TAuth, TContext>(string username, TAuth authenticationToken, TContext authenticationContext)
    {
      using (var db = new TestDbContext())
      {
        using (var userContext = await _userService.Become(db, username))
        {
          return userContext.User.Login.Username.ToLowerInvariant() == username;
        }
      }
    }
  }
}