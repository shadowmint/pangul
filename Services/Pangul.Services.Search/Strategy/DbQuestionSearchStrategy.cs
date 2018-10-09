using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Topics;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Search.Infrastructure;
using Pangul.Services.Internal.Search;
using Pangul.Services.Model;

namespace Pangul.Services.Search.Strategy
{
  /// <summary>
  /// Basic search service, don't use this unless elasticsearch is turned off.
  /// </summary>
  public class DbQuestionSearchStrategy : IQuestionSearchStrategy
  {
    public bool IsReadyForQuery(SearchQuery parsedQuery)
    {
      return parsedQuery.SearchType == SearchType.Questions;
    }

    public async Task<SearchResult> PerformQuery(SearchQuery parsedQuery, PangulDbContext db, UserContext user, int offset, int limit)
    {
      SetQueryTopic(parsedQuery);
      var results = new SearchResultAggregator(offset, limit);

      if (results.Push(await MatchTitle(parsedQuery, db)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchTag(parsedQuery, db)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchQuestionBody(parsedQuery, db)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchAnswerBody(parsedQuery, db)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchAll(parsedQuery, db)))
      {
        return results.AsResult();
      }
      
      return results.AsResult();
    }

    /// <summary>
    /// Every query must have a topic; if not set, use the default topic.
    /// </summary>
    private void SetQueryTopic(SearchQuery parsedQuery)
    {
      if (parsedQuery.Tokens.All(i => i.TokenType != SearchTokenType.Topic))
      {
        parsedQuery.AddToken(SearchTokenType.Topic, Topic.DefaultTopic);
      }
    }

    private async Task<IEnumerable<long>> MatchAnswerBody(SearchQuery parsedQuery, PangulDbContext db)
    {
      var allMatches = new List<long>();
      var topics = CollectTopics(parsedQuery);

      foreach (var term in parsedQuery.Terms)
      {
        var matches = from answer in db.Answer
          join question in db.Question on answer.QuestionId equals question.QuestionId
          join topic in db.Topic on question.TopicId equals topic.TopicId
          where EF.Functions.Like(answer.Body, $"%{term}%") && (topics.AnyTopic || topics.Topics.Contains(topic.Name))
          orderby question.QuestionId
          select question.QuestionId;

        allMatches.AddRange(await matches.ToListAsync());
      }

      return allMatches.Distinct().ToList();
    }

    private async Task<IEnumerable<long>> MatchQuestionBody(SearchQuery parsedQuery, PangulDbContext db)
    {
      var allMatches = new List<long>();
      var topics = CollectTopics(parsedQuery);

      foreach (var term in parsedQuery.Terms)
      {
        var matches = from question in db.Question
          join topic in db.Topic on question.TopicId equals topic.TopicId
          where EF.Functions.Like(question.Body, $"%{term}%") && (topics.AnyTopic || topics.Topics.Contains(topic.Name))
          orderby question.QuestionId
          select question.QuestionId;

        allMatches.AddRange(await matches.ToListAsync());
      }

      return allMatches.Distinct().ToList();
    }

    private static async Task<IEnumerable<long>> MatchTag(SearchQuery parsedQuery, PangulDbContext db)
    {
      var tagList = parsedQuery.Tokens.Where(i => i.TokenType == SearchTokenType.Tag).Select(i => i.TokenValue).ToArray();
      if (tagList.Length == 0) return new long[] { };

      var topics = CollectTopics(parsedQuery);

      return await (from tag in db.QuestionTag
          join question in db.Question on tag.QuestionId equals question.QuestionId
          join topic in db.Topic on question.TopicId equals topic.TopicId
          where tagList.Contains(tag.Tag) && (topics.AnyTopic || topics.Topics.Contains(topic.Name))
          orderby question.QuestionId
          select tag.QuestionId)
        .ToListAsync();
    }

    private static async Task<IEnumerable<long>> MatchTitle(SearchQuery parsedQuery, PangulDbContext db)
    {
      var allMatches = new List<long>();
      var topics = CollectTopics(parsedQuery);

      foreach (var term in parsedQuery.Terms)
      {
        var matches = from question in db.Question
          join topic in db.Topic on question.TopicId equals topic.TopicId
          where EF.Functions.Like(question.Title, $"%{term}%") && (topics.AnyTopic || topics.Topics.Contains(topic.Name))
          orderby question.QuestionId
          select question.QuestionId;

        allMatches.AddRange(await matches.ToListAsync());
      }

      return allMatches.Distinct().ToList();
    }

    private static async Task<IEnumerable<long>> MatchAll(SearchQuery parsedQuery, PangulDbContext db)
    {
      if (!parsedQuery.Terms.Contains("*"))
      {
        return new long[] { };
      }

      var topics = CollectTopics(parsedQuery);

      return await (from question in db.Question
        join topic in db.Topic on question.TopicId equals topic.TopicId
        where topics.AnyTopic || topics.Topics.Contains(topic.Name)
        orderby question.QuestionId
        select question.QuestionId).ToListAsync();
    }

    private static TopicList CollectTopics(SearchQuery parsedQuery)
    {
      var topics = parsedQuery.Tokens
        .Where(i => i.TokenType == SearchTokenType.Topic)
        .Select(i => i.TokenValue.ToLowerInvariant())
        .ToList();

      return new TopicList()
      {
        Topics = topics,
        AnyTopic = topics.Any(i => i == "*")
      };
    }

    private class TopicList
    {
      public List<string> Topics { get; set; }
      public bool AnyTopic { get; set; }
    }
  }
}