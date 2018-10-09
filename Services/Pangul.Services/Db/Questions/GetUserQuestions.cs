using System.Collections.Generic;
using System.Linq;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class GetUserQuestions : IQuery<IEnumerable<IQueryable<Question>>>
  {
    public UserContext UserContext { get; set; }

    public void GuardPropertyValues()
    {
      throw new System.NotImplementedException();
    }

    public void GuardRelatedObjects()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }
    }

    public void DeriveProperties()
    {
    }
  }
}