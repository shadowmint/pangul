using Pangul.Services.Actions;
using Pangul.Services.Db.DerivedPropertyModels;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Topics
{
  public class CreateTopic : ICommand
  {
    public UserContext UserContext { get; set; }
    public string TopicName { get; set; }
    public DerivedTopicProperties DerivedProperties { get; } = new DerivedTopicProperties();

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(TopicName), "TopicName");
    }

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
    }

    public void DeriveProperties()
    {
      DerivedProperties.TopicName = this.DeriveProperty(() => TopicName.ToLowerInvariant().Trim(), "TopicName");
    }
  }
}