using System;
using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class GetQuestion : IQuery<Question>
  {
    public UserContext UserContext { get; set; }

    public string QuestionId { get; set; }

    public DerivedProperties Derived { get; } = new DerivedProperties();

    /// <summary>
    /// Don't fetch related objects, for simple queries.
    /// </summary>
    public bool LightWeightOnly { get; set; }

    public string RowVersion { get; set; }

    // For naive (non-update purposes) allow get without knowing the row version.
    public bool IgnoreRowVersion { get; set; }

    public void GuardPropertyValues()
    {
      if (string.IsNullOrWhiteSpace(QuestionId))
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "QuestionId");
      }

      if (!IgnoreRowVersion)
      {
        if (string.IsNullOrWhiteSpace(RowVersion))
        {
          throw new CommandValidationException(CommandValidationType.InvalidProperty, "RowVersion");
        }
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
        throw new CommandValidationException(CommandValidationType.UnableToDeriveProperty, "QuestionId", error);
      }

      if (!IgnoreRowVersion)
      {
        try
        {
          Derived.RowVersion = PangulRowVersion.GetBytes(RowVersion);
        }
        catch (Exception error)
        {
          throw new CommandValidationException(CommandValidationType.UnableToDeriveProperty, "RowVersion", error);
        }
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
      public byte[] RowVersion { get; set; }
    }
  }
}