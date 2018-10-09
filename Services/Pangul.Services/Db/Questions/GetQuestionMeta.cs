using System;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class GetQuestionMeta : IQuery<QuestionMeta>
  {
    public UserContext UserContext { get; set; }

    public string QuestionId { get; set; }

    public DerivedProperties Derived { get; } = new DerivedProperties();

    public void GuardPropertyValues()
    {
      if (string.IsNullOrWhiteSpace(QuestionId))
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "QuestionId");
      }
    }

    public void DeriveProperties()
    {
      try
      {
        Derived.QuestionId = long.Parse(QuestionId);
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "QuestionId", error);
      }
    }

    public void GuardRelatedObjects()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }
    }

    public class DerivedProperties
    {
      public long QuestionId { get; set; }
    }
  }
}