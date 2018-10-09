using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Topics;
using Pangul.Services.Actions;
using Pangul.Services.Db.Topics;

namespace Pangul.Services.Concrete.Db.Topics
{
  public class TopicQueryHandler : IQueryHandler<GetTopic, Topic>
  {
    public Task<Topic> Execute(PangulDbContext db, GetTopic request)
    {
      request.Validate();
      var query = PartialQuery(db, request);

      if (!request.IgnoreRowVersion)
      {
        query = query.Where(i => i.RowVersion == request.DerivedProperties.RowVersion);
      }

      return query.FirstOrDefaultAsync();
    }

    private IQueryable<Topic> PartialQuery(PangulDbContext db, GetTopic query)
    {
      if (query.DerivedProperties.QueryByName)
      {
        return db.Topic.Where(i => i.Name == query.DerivedProperties.TopicName);
      }

      return db.Topic.Where(i => i.TopicId == query.DerivedProperties.TopicId);
    }
  }
}