using System;
using Pangul.Core.Infrastructure;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class CreateNewAnswer : ICommand
  {
    public UserContext UserContext { get; set; }
    public string QuestionId { get; set; }
    public string Body { get; set; }

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
    }

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(QuestionId), "QuestionId");
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(Body), "Body");
    }

    public void DeriveProperties()
    {
    }
  }
}