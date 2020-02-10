using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Topics;
using Pangul.Services.Db.Questions;
using Pangul.Services.Db.Topics;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Model;

namespace Pangul.Services.Services.Topics
{
  public interface ITopicService
  {
    /// <summary>
    /// Create a topic; do nothing if it already exists.
    /// </summary>
    Task<Topic> RequireTopic(PangulDbContext db, UserContext user, string topic);

    /// <summary>
    /// Get a topic by id that must already exist.
    /// </summary>
    Task<Topic> GetTopic(PangulDbContext db, UserContext user, string topicId);

    /// <summary>
    /// Delete an existing topic, but only if it has no questions.
    /// </summary>
    Task DeleteTopic(PangulDbContext db, UserContext user, string topicId, string rowVersion);

    /// <summary>
    /// Update an existing topic.
    /// </summary>
    Task<Topic> UpdateTopic(PangulDbContext db, UserContext user, UpdateTopic model);

    /// <summary>
    /// Find topics.
    /// </summary>
    Task<SearchResult> FindTopics(PangulDbContext db, UserContext user, string query, int offset, int limit);
  }
}