using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
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

      if (results.Push(await MatchTitle(parsedQuery, db, user)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchTag(parsedQuery, db, user)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchQuestionBody(parsedQuery, db, user)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchAnswerBody(parsedQuery, db, user)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchAll(parsedQuery, db, user)))
      {
        return results.AsResult();
      }

      return results.AsResult();
    }


    private async Task<IEnumerable<long>> MatchAnswerBody(SearchQuery parsedQuery, PangulDbContext db, UserContext user)
    {
      var allMatches = new List<long>();
      foreach (var term in parsedQuery.Terms)
      {
        var questionQuery = db.Question
          .Join(db.Answer, q => q.QuestionId, a => a.QuestionId, (question, answer) => new {question, answer})
          .Where(i => EF.Functions.Like(i.answer.Body, $"%{term}%"))
          .Select(i => i.question);

        questionQuery = ApplyTopicFilter(questionQuery, parsedQuery, db);
        questionQuery = ApplyStarFilter(questionQuery, parsedQuery, db, user);
        allMatches.AddRange(await questionQuery.Select(i => i.QuestionId).ToListAsync());
      }

      return allMatches.Distinct().ToList();
    }

    private async Task<IEnumerable<long>> MatchQuestionBody(SearchQuery parsedQuery, PangulDbContext db, UserContext user)
    {
      var allMatches = new List<long>();
      foreach (var term in parsedQuery.Terms)
      {
        var questionQuery = db.Question.Where(i => EF.Functions.Like(i.Body, $"%{term}%")).Select(i => i);
        questionQuery = ApplyTopicFilter(questionQuery, parsedQuery, db);
        questionQuery = ApplyStarFilter(questionQuery, parsedQuery, db, user);
        allMatches.AddRange(await questionQuery.Select(i => i.QuestionId).ToListAsync());
      }

      return allMatches.Distinct().ToList();
    }

    private static async Task<IEnumerable<long>> MatchTag(SearchQuery parsedQuery, PangulDbContext db, UserContext user)
    {
      var tagList = parsedQuery.Tokens.Where(i => i.TokenType == SearchTokenType.Tag).Select(i => i.TokenValue).ToArray();
      if (tagList.Length == 0) return new long[] { };

      var questionQuery = db.Question.Select(i => i);
      questionQuery = ApplyTopicFilter(questionQuery, parsedQuery, db);
      questionQuery = ApplyStarFilter(questionQuery, parsedQuery, db, user);
      questionQuery = ApplyTagFilter(questionQuery, parsedQuery, db, tagList);
      return await questionQuery.Select(i => i.QuestionId).ToListAsync();
    }

    private static async Task<IEnumerable<long>> MatchTitle(SearchQuery parsedQuery, PangulDbContext db, UserContext user)
    {
      var allMatches = new List<long>();
      foreach (var term in parsedQuery.Terms)
      {
        var questionQuery = db.Question.Where(i => EF.Functions.Like(i.Title, $"%{term}%")).Select(i => i);
        questionQuery = ApplyTopicFilter(questionQuery, parsedQuery, db);
        questionQuery = ApplyStarFilter(questionQuery, parsedQuery, db, user);
        allMatches.AddRange(await questionQuery.Select(i => i.QuestionId).ToListAsync());
      }

      return allMatches.Distinct().ToList();
    }

    private static async Task<IEnumerable<long>> MatchAll(SearchQuery parsedQuery, PangulDbContext db, UserContext user)
    {
      if (!parsedQuery.Terms.Contains("*"))
      {
        return new long[] { };
      }

      var questionQuery = db.Question.Select(i => i);
      questionQuery = ApplyTopicFilter(questionQuery, parsedQuery, db);
      questionQuery = ApplyStarFilter(questionQuery, parsedQuery, db, user);
      return await questionQuery.Select(i => i.QuestionId).ToListAsync();
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

    private static IQueryable<Question> ApplyTopicFilter(IQueryable<Question> questionQuery, SearchQuery parsedQuery, PangulDbContext db)
    {
      var topics = CollectTopics(parsedQuery);
      return questionQuery
        .Join(db.Topic, q => q.TopicId, t => t.TopicId, (question, topic) => new {question, topic})
        .Where(r => topics.AnyTopic || topics.Topics.Contains(r.topic.Name))
        .Select(r => r.question);
    }

    private static IQueryable<Question> ApplyTagFilter(IQueryable<Question> questionQuery, SearchQuery query, PangulDbContext db, string[] tagList)
    {
      if (query.Tokens.All(i => i.TokenType != SearchTokenType.Tag))
      {
        return questionQuery;
      }

      return questionQuery
        .Join(db.QuestionTag, q => q.QuestionId, t => t.QuestionId, (question, tag) => new {question, tag})
        .Where(r => tagList.Contains(r.tag.Tag))
        .Select(r => r.question);
    }

    private static IQueryable<Question> ApplyStarFilter(IQueryable<Question> questionQuery, SearchQuery query, PangulDbContext db, UserContext user)
    {
      if (!query.Tokens.Any(i => i.TokenType == SearchTokenType.Is && i.TokenValue == "star"))
      {
        return questionQuery;
      }

      return questionQuery
        .Join(db.QuestionMeta, q => q.QuestionId, m => m.QuestionId, (question, meta) => new {question, meta})
        .Where(r => r.meta.Star && r.meta.UserId == user.User.UserId)
        .Select(r => r.question);
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