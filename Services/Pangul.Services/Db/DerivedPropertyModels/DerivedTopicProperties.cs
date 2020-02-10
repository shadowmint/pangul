namespace Pangul.Services.Db.DerivedPropertyModels
{
  public class DerivedTopicProperties
  {
    public long TopicId { get; set; }
    public string TopicName { get; set; }
    public bool QueryByName { get; set; }
    public byte[] RowVersion { get; set; }
  }
}