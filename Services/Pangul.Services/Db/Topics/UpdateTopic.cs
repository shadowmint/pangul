using Pangul.Core.Data.Topics;
using Pangul.Services.Actions;
using Pangul.Services.Db.DerivedPropertyModels;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Topics
{
  public class UpdateTopic : ICommand
  {
    public UserContext UserContext { get; set; }
    public string TopicId { get; set; }
    public byte[] Icon { get; set; }
    public string IconType { get; set; }
    public string Description { get; set; }
    public string RowVersion { get; set; }
    public DerivedTopicProperties DerivedProperties { get; } = new DerivedTopicProperties();

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(RowVersion), "RowVersion");
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(TopicId), "TopicId");
      this.GuardPropertyValue(() => Icon == null && IconType == null || Icon != null && IconType != null, "Icon,IconType");
    }

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
    }

    public void DeriveProperties()
    {
      DerivedProperties.TopicId = this.DeriveProperty(() => long.Parse(TopicId), "TopicId");
    }

    public void ApplyTo(Topic topic)
    {
      if (Icon != topic.Icon)
      {
        topic.Icon = Icon;
        topic.IconType = IconType;
      }

      if (Description != topic.Description)
      {
        topic.Description = Description;
      }
    }
  }
}