using System;
using System.Collections.Generic;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class GetAnswerIds : IQuery<IEnumerable<long>>
  {
    public UserContext UserContext { get; set; }

    public string QuestionId { get; set; }

    public int Offset { get; set; } = 0;

    public int? Limit { get; set; } = null;

    public DerviedProperties Dervied { get; } = new DerviedProperties();

    public void GuardPropertyValues()
    {
      if (String.IsNullOrWhiteSpace(QuestionId))
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "QuestionId");
      }
    }

    public void DeriveProperties()
    {
      try
      {
        Dervied.QuestionId = long.Parse(QuestionId);
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

    public class DerviedProperties
    {
      public long QuestionId { get; set; }
    }
  }
}