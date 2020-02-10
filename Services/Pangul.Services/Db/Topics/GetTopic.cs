using Pangul.Core.Infrastructure;
using Pangul.Services.Actions;
using Pangul.Services.Db.DerivedPropertyModels;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Topics
{
  public class GetTopic : IQuery<Core.Data.Topics.Topic>
  {
    public UserContext UserContext { get; set; }
    public string TopicName { get; set; }
    public string TopicId { get; set; }
    public string RowVersion { get; set; }
    public bool IgnoreRowVersion { get; set; }
    
    public DerivedTopicProperties DerivedProperties { get; } = new DerivedTopicProperties();

    public void GuardPropertyValues()
    {
      this.GuardPropertyValue(() => IgnoreRowVersion || RowVersion != null, "RowVersion");
      this.GuardPropertyValue(() => !string.IsNullOrWhiteSpace(TopicName) || !string.IsNullOrWhiteSpace(TopicId), "TopicId or TopicName is required");
    }

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
    }

    public void DeriveProperties()
    {
      if (TopicId != null)
      {
        DerivedProperties.TopicId = this.DeriveProperty(() => long.Parse(TopicId), "TopicId");  
      }

      if (TopicName != null)
      {
        DerivedProperties.TopicName = this.DeriveProperty(() => TopicName.Trim().ToLowerInvariant(), "TopicName");
        DerivedProperties.QueryByName = true;
      }

      DerivedProperties.RowVersion = this.DeriveProperty(() => PangulRowVersion.GetBytes(RowVersion), "RowVersion");
    }
  }
}