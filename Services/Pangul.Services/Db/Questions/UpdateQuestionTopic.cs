using Pangul.Core.Data.Topics;
using Pangul.Core.Infrastructure;
using Pangul.Services.Actions;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class UpdateQuestionTopic : ICommand
  {
    public UserContext UserContext { get; set; }
    public string QuestionId { get; set; }
    public string RowVersion { get; set; }
    public string TopicName { get; set; }

    public DerivedProperties Derived { get; } = new DerivedProperties();

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
    }

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(QuestionId), "QuestionId");
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(TopicName), "TopicName");
    }

    public void DeriveProperties()
    {
      Derived.RowVersion = this.DeriveProperty(() => PangulRowVersion.GetBytes(RowVersion), "RowVersion");
      Derived.QuestionId = this.DeriveProperty(() => long.Parse(QuestionId), "QuestionId");
    }

    public class DerivedProperties
    {
      public byte[] RowVersion { get; set; }
      public long QuestionId { get; set; }
      public Topic Topic { get; set; }
    }
  }
}