using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using NCore.Base.Commands;
using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Model;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Story
{
  public class SearchUserStoryTests
  {
    [Fact]
    public async Task TestSearchForQuestion__WithMatchingTitles__FindsOnlyMatchingQuestions()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var questionSearch = fixture.Container.Resolve<ISearchService>();

        await fixture.QuestionHelper.CreateQuestion("admin", "New Question", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "Question New Question", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "Question New", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "Question Old", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "Old", "Some question body");

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var matchingQuestions = await questionSearch.SearchForQuestions(db, user, "New", 0, 10);
            Assert.Equal(3, matchingQuestions.IdentityList.Count);
            Assert.False(matchingQuestions.MoreResults);
            Assert.True(matchingQuestions.HasResults);
          }
        }
      }
    }

    [Fact]
    public async Task TestSearchForQuestion__WithLimitAndOffset__ReturnsBoundedResultSet()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var questionSearch = fixture.Container.Resolve<ISearchService>();

        await fixture.QuestionHelper.CreateQuestion("admin", "New Question", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "Question New Question", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "Question Old", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "Question New", "Some question body");
        await fixture.QuestionHelper.CreateQuestion("admin", "New", "Some question body");

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var matchingQuestions1 = await questionSearch.SearchForQuestions(db, user, "New", 0, 2);
            Assert.Equal(2, matchingQuestions1.IdentityList.Count);
            Assert.True(matchingQuestions1.MoreResults);
            Assert.True(matchingQuestions1.HasResults);

            var matchingQuestions2 = await questionSearch.SearchForQuestions(db, user, "New", 2, 3);
            Assert.Equal(2, matchingQuestions2.IdentityList.Count);
            Assert.False(matchingQuestions2.MoreResults);
            Assert.True(matchingQuestions2.HasResults);

            var combinedIdentityList = matchingQuestions1.IdentityList.ToList();
            combinedIdentityList.AddRange(matchingQuestions2.IdentityList);
            Assert.Equal(4, combinedIdentityList.Distinct().ToList().Count());
          }
        }
      }
    }

    [Fact]
    public async Task TestSearchForQuestion__WithMultipleAnswersAndMatchingAnswer__ReturnsMatchingQuestion()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var questionSearch = fixture.Container.Resolve<ISearchService>();

        var question = await fixture.QuestionHelper.CreateQuestion("admin", "New question", "Some answer goes here");
        await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer ONE");
        await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer TWO");
        await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer THREE");
        await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer ONE TWO THREE");

        var question2 = await fixture.QuestionHelper.CreateQuestion("admin", "New question", "Some answer goes here");
        await fixture.AnswerHelper.AnswerQuestion("admin", question2, "answer THREE");
        await fixture.AnswerHelper.AnswerQuestion("admin", question2, "answer FOUR");
        await fixture.AnswerHelper.AnswerQuestion("admin", question2, "answer FIVE");
        await fixture.AnswerHelper.AnswerQuestion("admin", question2, "answer THREE FOUR FIVE");

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var matchingQuestions1 = await questionSearch.SearchForQuestions(db, user, "ONE", 0, 10);
            Assert.Single(matchingQuestions1.IdentityList);

            var matchingAnswers1 = await questionSearch.FindAnswersForQuestion(db, user, matchingQuestions1.IdentityList[0].ToString(), 0, 10);
            Assert.Equal(4, matchingAnswers1.IdentityList.Count);

            var matchingQuestions2 = await questionSearch.SearchForQuestions(db, user, "THREE", 0, 10);
            Assert.Equal(2, matchingQuestions2.IdentityList.Count);

            var matchingAnswers2 = await questionSearch.FindAnswersForQuestion(db, user, matchingQuestions2.IdentityList[1].ToString(), 2, 2);
            Assert.Equal(2, matchingAnswers2.IdentityList.Count);
            Assert.False(matchingAnswers2.MoreResults);
          }
        }
      }
    }

    [Fact]
    public async Task TestGetAnswersForQuestion__WithMultipleAnswers__ReturnsAnswersInSortedOrder()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var questionSearch = fixture.Container.Resolve<ISearchService>();
        var answerService = fixture.Container.Resolve<IAnswerService>();

        var question = await fixture.QuestionHelper.CreateQuestion("admin", "New question", "Some answer goes here");
        var answer1 = await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer ONE");
        var answer2 = await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer TWO");
        var answer3 = await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer THREE");
        var answer4 = await fixture.AnswerHelper.AnswerQuestion("admin", question, "answer ONE TWO THREE");

        // Add some votes
        await fixture.UserHelper.CreateUser("user1");
        await fixture.UserHelper.CreateUser("user2");
        await fixture.UserHelper.CreateUser("user3");
        await fixture.UserHelper.CreateUser("user4");

        await fixture.AnswerHelper.VoteForAnswer("user1", answer1);
        await fixture.AnswerHelper.VoteForAnswer("user1", answer2);
        await fixture.AnswerHelper.VoteForAnswer("user1", answer3);
        await fixture.AnswerHelper.VoteForAnswer("user1", answer4);

        await fixture.AnswerHelper.VoteForAnswer("user2", answer2);
        await fixture.AnswerHelper.VoteForAnswer("user2", answer3);
        await fixture.AnswerHelper.VoteForAnswer("user2", answer4);

        await fixture.AnswerHelper.VoteForAnswer("user3", answer3);
        await fixture.AnswerHelper.VoteForAnswer("user3", answer4);

        await fixture.AnswerHelper.VoteForAnswer("user4", answer4);

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var answers = await questionSearch.FindAnswersForQuestion(db, user, question.QuestionId.ToString(), 0, 10);

            var answerMetadata = new List<AnswerMetaInternalModel>();
            foreach (var answerId in answers.IdentityList)
            {
              var answer = await answerService.GetAnswerMetadata(db, user, answerId.ToString());
              answerMetadata.Add(answer);
            }

            Assert.Equal(4, answerMetadata[0].GlobalMeta.Votes);
            Assert.Equal(3, answerMetadata[1].GlobalMeta.Votes);
            Assert.Equal(2, answerMetadata[2].GlobalMeta.Votes);
            Assert.Equal(1, answerMetadata[3].GlobalMeta.Votes);
          }
        }
      }
    }

    [Fact]
    public async Task TestSearchForQuestion__WithMultipleTopics__ReturnsAnswersOnlyInTheSelectedTopic()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var questionSearch = fixture.Container.Resolve<ISearchService>();

        await fixture.QuestionHelper.CreateQuestion("admin", "Q1-default", "Some answer goes here");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q1-T1", "Some answer goes here", "T1");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q1-T2", "Some answer goes here", "T1");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q2-T1", "Some answer goes here", "T2");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q2-T2", "Some answer goes here", "T2");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q3-T1", "Some answer goes here", "T3");

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var defaultSearch = await questionSearch.SearchForQuestions(db, user, "answer", 0, 10);
            var t1Search = await questionSearch.SearchForQuestions(db, user, "topic:T1 answer", 0, 10);
            var t2Search = await questionSearch.SearchForQuestions(db, user, "topic:T2 answer", 0, 10);
            var t3Search = await questionSearch.SearchForQuestions(db, user, "topic:T1 topic:T3 answer", 0, 10);

            Assert.Single(defaultSearch.IdentityList);
            Assert.Equal(2, t1Search.IdentityList.Count);
            Assert.Equal(2, t2Search.IdentityList.Count);
            Assert.Equal(3, t3Search.IdentityList.Count);
          }
        }
      }
    }

    [Fact]
    public async Task TestSearchForQuestionInAllTopics__WithMultipleTopics__ReturnsAnswersFromAllTopics()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var questionSearch = fixture.Container.Resolve<ISearchService>();

        await fixture.QuestionHelper.CreateQuestion("admin", "Q1-default", "Some answer goes here");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q1-T1", "Some answer goes here", "T1");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q1-T2", "Some answer goes here", "T1");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q2-T1", "Some answer goes here", "T2");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q2-T2", "Some answer goes here", "T2");
        await fixture.QuestionHelper.CreateQuestion("admin", "Q3-T1", "Some answer goes here", "T3");

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var results = await questionSearch.SearchForQuestions(db, user, "topic:* answer", 0, 10);
            Assert.Equal(6, results.IdentityList.Count);
          }
        }
      }
    }
  }
}