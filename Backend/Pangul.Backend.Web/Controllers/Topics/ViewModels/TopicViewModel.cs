using Pangul.Core.Data.Topics;
using Pangul.Core.Infrastructure;

namespace Pangul.Backend.Web.Controllers.Topics.ViewModels
{
  public class TopicViewModel
  {
    public TopicViewModel(Topic model)
    {
      TopicId = model.TopicId.ToString();
      Name = model.Name;
      Description = model.Description ?? "";
      Icon = PangulStringEncoding.GetDataUrlFromBytes(model.Icon, model.IconType);
      RowVersion = PangulRowVersion.GetString(model.RowVersion);
    }

    public string Name { get; set; }
    public string TopicId { get; set; }
    public string Icon { get; set; }
    public string Description { get; set; }
    public string RowVersion { get; set; }
  }
}