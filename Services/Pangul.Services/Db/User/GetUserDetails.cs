using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;

namespace Pangul.Services.Db.User
{
  public class GetUserDetails : IQuery<Core.Data.Users.User>
  {
    public string Login { get; set; }

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(Login), "Loging");
    }

    public void GuardRelatedObjects()
    {
    }

    public void DeriveProperties()
    {
      Login = this.DeriveProperty(() => Login.Trim().ToLowerInvariant(), "Login");
    }
  }
}