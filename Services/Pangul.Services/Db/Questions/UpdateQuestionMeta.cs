using System;
using Pangul.Core.Infrastructure;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class UpdateQuestionMeta : ICommand
  {
    public UserContext UserContext { get; set; }
    public string QuestionId { get; set; }
    public string RowVersion { get; set; }
    public int Votes { get; set; }
    public bool Star { get; set; }

    public DerivedProperties Derived { get; } = new DerivedProperties();

    public void GuardRelatedObjects()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }
    }

    public void GuardPropertyValues()
    {
      if (string.IsNullOrWhiteSpace(QuestionId))
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "QuestionId");
      }
      
      if (Math.Abs(Votes) > 1)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "Votes");
      }
    }

    public void DeriveProperties()
    {
      try
      {
        Derived.RowVersion = PangulRowVersion.GetBytes(RowVersion);
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "RowVersion", error);
      }

      try
      {
        Derived.QuestionId = long.Parse(QuestionId);
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "QuestionId", error);
      }
    }

    public class DerivedProperties
    {
      public byte[] RowVersion { get; set; }
      public long QuestionId { get; set; }
    }
  }
}