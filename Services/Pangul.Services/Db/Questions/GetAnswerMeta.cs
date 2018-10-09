using System;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class GetAnswerMeta : IQuery<AnswerMeta>
  {
    public UserContext UserContext { get; set; }
   
    public string AnswerId { get; set; }
   
    public DerivedProperties Derived { get; } = new DerivedProperties();

    public void GuardPropertyValues()
    {
      if (string.IsNullOrWhiteSpace(AnswerId))
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, "AnswerId");
      }
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
   
    public void GuardRelatedObjects()
    {
      if (UserContext == null)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, "UserContext");
      }
    }
   
    public class DerivedProperties
    {
      public long AnswerId { get; set; }
    }
  }
}