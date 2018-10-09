using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class PurgeQuestionData : ICommand
  {
    public UserContext UserContext { get; set; }
    public Question Question { get; set; }

    public void GuardPropertyValues()
    {
    }

    public void GuardRelatedObjects()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }

      if (Question == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "Question");
      }
    }

    public void DeriveProperties()
    {
    }
  }
}