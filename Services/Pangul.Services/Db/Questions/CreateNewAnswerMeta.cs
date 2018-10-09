using System;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class CreateNewAnswerMeta : ICommand
  {
    public UserContext UserContext { get; set; }
    public string AnswerId { get; set; }
    public bool SkipIfExisting { get; set; } = true;

    public DerivedProperties Derived { get; } = new DerivedProperties();

    public void GuardPropertyValues()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }
    }

    public void GuardRelatedObjects()
    {
    }

    public void DeriveProperties()
    {
      try
      {
        Derived.AnswerId = long.Parse(AnswerId);
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "AnswerId", error);
      }
    }

    public class DerivedProperties
    {
      public long AnswerId { get; set; }
    }
  }
}