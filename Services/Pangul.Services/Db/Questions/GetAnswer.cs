using System;
using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class GetAnswer : IQuery<Answer>
  {
    public UserContext UserContext { get; set; }

    public string AnswerId { get; set; }

    public bool IgnoreRowVersion { get; set; }

    public string RowVersion { get; set; }

    public DerviedProperties Dervied { get; } = new DerviedProperties();

    public void GuardPropertyValues()
    {
      if (String.IsNullOrWhiteSpace(AnswerId))
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "AnswerId");
      }

      if (String.IsNullOrWhiteSpace(RowVersion) && !IgnoreRowVersion)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "RowVersion");
      }
    }

    public void DeriveProperties()
    {
      try
      {
        Dervied.RowVersion = PangulRowVersion.GetBytes(RowVersion);
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "RowVersion", error);
      }

      try
      {
        Dervied.AnswerId = long.Parse(AnswerId);
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "AnswerId", error);
      }
    }

    public void GuardRelatedObjects()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }
    }

    public class DerviedProperties
    {
      public long AnswerId { get; set; }
      public byte[] RowVersion { get; set; }
    }
  }
}