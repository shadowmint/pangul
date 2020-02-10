using Pangul.Services.Actions;

namespace Pangul.Services.Db.User
{
  public class GetUserDetails : IQuery<Core.Data.Users.User>
  {
    public string Login { get; set; }
    public string UserId { get; set; }
    public bool QueryByUsername => !string.IsNullOrWhiteSpace(Login);

    public readonly DerivedProperties Derived = new DerivedProperties();

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(Login) || !string.IsNullOrWhiteSpace(UserId), "Login || UserId required");
    }

    public void GuardRelatedObjects()
    {
    }

    public void DeriveProperties()
    {
      if (!string.IsNullOrWhiteSpace(Login))
      {
        Login = this.DeriveProperty(() => Login.Trim().ToLowerInvariant(), "Login");
      }

      if (!string.IsNullOrWhiteSpace(UserId))
      {
        Derived.UserId = this.DeriveProperty(() => long.Parse(UserId), "UserId");
      }
    }

    public class DerivedProperties
    {
      public long UserId { get; set; }
    }
  }
}