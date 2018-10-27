using Pangul.Core.Data.Users;

namespace Pangul.Backend.Web.Controllers.Users
{
  public class UserViewModel
  {
    public string UserId { get; set; }
    public string Username { get; set; }

    public static UserViewModel From(User user)
    {
      return new UserViewModel()
      {
        UserId = user.UserId.ToString(),
        Username = user.Login.Username,
      };
    }
  }
}