using Pangul.Core.Data.Questions;
using Pangul.Core.Data.Topics;
using Pangul.Core.Infrastructure;
using Pangul.Services.Actions;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class UpdateQuestion : ICommand
  {
    public UserContext UserContext { get; set; }
    public string QuestionId { get; set; }
    public string Body { get; set; }
    public string Title { get; set; }
    public string[] Tags { get; set; }
    public string Topic { get; set; }
    public string RowVersion { get; set; }

    public DerivedProperties Derived { get; } = new DerivedProperties();

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
      this.GuardRelatedObject(() => Topic == null || Derived.Topic != null, "Topic");
    }

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(QuestionId), "QuestionId");
      this.GuardPropertyValue(() => !string.IsNullOrEmpty(Body), "Body");
      this.GuardPropertyValue(() => !string.IsNullOrEmpty(Title), "Title");
      this.GuardPropertyValue(() => !string.IsNullOrEmpty(RowVersion), "RowVersion");
    }

    public void DeriveProperties()
    {
      Derived.RowVersion = this.DeriveProperty(() => PangulRowVersion.GetBytes(RowVersion), "RowVersion");
    }

    public class DerivedProperties
    {
      public byte[] RowVersion { get; set; }
      public Topic Topic { get; set; }
    }

    public void ApplyTo(Question question)
    {
      question.Title = Title;
      question.Body = Body;
      question.RowVersion = Derived.RowVersion;

      // Optional; used if topic is set.
      if (Derived.Topic != null)
      {
        question.TopicId = Derived.Topic.TopicId;
      }
    }
  }
}