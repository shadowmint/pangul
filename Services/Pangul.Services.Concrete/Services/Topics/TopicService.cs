using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Topics;
using Pangul.Services.Actions;
using Pangul.Services.Db.Topics;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Internal.Search;
using Pangul.Services.Model;
using Pangul.Services.Services.Topics;

namespace Pangul.Services.Concrete.Services.Topics
{
  public class TopicService : ITopicService, IService
  {
    private readonly ICreateCommandHandler<CreateTopic, Topic> _createTopic;
    private readonly ICommandHandler<UpdateTopic> _updateTopic;
    private readonly ICommandHandler<DeleteTopic> _deleteTopic;
    private readonly IQueryHandler<GetTopic, Topic> _getTopic;
    private readonly IInternalSearchService _searchService;

    public TopicService(
      ICreateCommandHandler<CreateTopic, Topic> createTopic,
      ICommandHandler<UpdateTopic> updateTopic,
      ICommandHandler<DeleteTopic> deleteTopic,
      IQueryHandler<GetTopic, Topic> getTopic,
      IInternalSearchService searchService)
    {
      _createTopic = createTopic;
      _updateTopic = updateTopic;
      _deleteTopic = deleteTopic;
      _getTopic = getTopic;
      _searchService = searchService;
    }

    public async Task<Topic> RequireTopic(PangulDbContext db, UserContext user, string topic)
    {
      var existingTopic = await _getTopic.Execute(db, new GetTopic()
      {
        UserContext = user,
        TopicName = topic,
        IgnoreRowVersion = true
      });

      if (existingTopic != null)
      {
        return existingTopic;
      }

      using (var outOfBandContext = db.CreateScope())
      {
        var newTopic = await _createTopic.Execute(outOfBandContext, new CreateTopic()
        {
          UserContext = user,
          TopicName = topic
        });

        await outOfBandContext.SaveChangesAsync();
        return newTopic;
      }
    }

    public async Task<Topic> GetTopic(PangulDbContext db, UserContext user, string topicId)
    {
      return await _getTopic.Execute(db, new GetTopic()
      {
        UserContext = user,
        TopicId = topicId,
        IgnoreRowVersion = true
      });
    }

    public Task DeleteTopic(PangulDbContext db, UserContext user, string topicId, string rowVersion)
    {
      return _deleteTopic.Execute(db, new DeleteTopic()
      {
        UserContext = user,
        TopicId = topicId,
        RowVersion = rowVersion
      });
    }

    public async Task<Topic> UpdateTopic(PangulDbContext db, UserContext user, UpdateTopic model)
    {
      model.UserContext = user;
      await _updateTopic.Execute(db, model);

      return await _getTopic.Execute(db, new GetTopic()
      {
        UserContext = user,
        TopicId = model.TopicId,
        IgnoreRowVersion = true,
      });
    }

    public Task<SearchResult> FindTopics(PangulDbContext db, UserContext user, string query, int offset, int limit)
    {
      return _searchService.SearchTopics(db, user, query, offset, limit);
    }
  }
}