using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class PurgeAnswerData : ICommand
  {
    public UserContext UserContext { get; set; }
    public Answer Answer { get; set; }

    public void GuardPropertyValues()
    {
    }

    public void GuardRelatedObjects()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }

      if (Answer == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "Answer");
      }
    }

    public void DeriveProperties()
    {
    }
  }
}