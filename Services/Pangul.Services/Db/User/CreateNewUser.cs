using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;

namespace Pangul.Services.Db.User
{
  public class CreateNewUser : ICommand
  {
    public string Username { get; set; }

    public void GuardPropertyValues()
    {
      if (string.IsNullOrWhiteSpace(Username))
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "Username");
      }
    }

    public void GuardRelatedObjects()
    {
    }

    public void DeriveProperties()
    {
      Username = Username.Trim().ToLowerInvariant();
    }
  }
}