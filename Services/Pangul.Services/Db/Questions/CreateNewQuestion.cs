using Pangul.Core.Data.Topics;
using Pangul.Services.Actions;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class CreateNewQuestion : ICommand
  {
    public UserContext UserContext { get; set; }
    public string[] Tags { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public string Topic { get; set; }
    public Topic TopicRef { get; set; }

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
      this.GuardRelatedObject(() => TopicRef != null, "TopicRef");
    }

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(Title), "Title");
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(Topic), "Topic");
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(Body), "Body");
    }

    public void DeriveProperties()
    {
    }
  }
}