using Pangul.Services.Actions;
using Pangul.Services.Db.DerivedPropertyModels;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Topics
{
  public class DeleteTopic : ICommand
  {
    public UserContext UserContext { get; set; }
    public string TopicId { get; set; }
    public DerivedTopicProperties DerivedProperties { get; } = new DerivedTopicProperties();
    public string RowVersion { get; set; }

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(TopicId), "TopicId");
    }

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
    }

    public void DeriveProperties()
    {
      DerivedProperties.TopicId = this.DeriveProperty(() => long.Parse(TopicId), "TopicId");
    }
  }
}