using System;
using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Data.Topics;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Questions;
using Pangul.Services.Internal.Search;
using Pangul.Services.Services.Questions;
using Pangul.Services.Services.Topics;
using Pangul.Services.Tests.Fixtures;
using Pangul.Services.Tests.Helpers;
using Xunit;

namespace Pangul.Services.Tests.Story
{
  public class QuestionUserStoryTests
  {
    [Fact]
    public async Task TestUpdateQuestion__WithInvalidRowData__Fails()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "New question", "Some question body");
        var questionService = fixture.Container.Resolve<IQuestionService>();

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var instance = await questionService.GetQuestion(db, user, question.QuestionId.ToString());
            Assert.NotNull(instance.RowVersion);
          }
        }

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            await Assert.ThrowsAsync<Pangul.Services.Infrastructure.Errors.PangulCommandFailedException>(async () =>
            {
              await questionService.UpdateQuestion(db, user, new UpdateQuestion()
              {
                QuestionId = question.QuestionId.ToString(),
                Title = "New title",
                Body = "Body",
                Tags = new string[] { },
                RowVersion = PangulRowVersion.GetString(Guid.NewGuid().ToByteArray())
              });
              await db.SaveChangesAsync();
            });
          }
        }
      }
    }

    [Fact]
    public async Task TestCreateQuestion__WithTrivialData__IsSuccessful()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");

        var questionService = fixture.Container.Resolve<IQuestionService>();
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var question = await questionService.CreateQuestion(db, user, new CreateNewQuestion()
            {
              Title = "New Question",
              Body = "Some question body",
              Tags = new[] {QuestionHelper.NewQuestionTag},
              Topic = Topic.DefaultTopic,
            });
            await db.SaveChangesAsync();

            var instance = await questionService.GetQuestion(db, user, question.QuestionId.ToString());
            Assert.NotNull(instance);
            Assert.Equal("New Question", instance.Title);

            var meta = await questionService.GetQuestionMetadata(db, user, question.QuestionId.ToString());
            Assert.Equal(0, meta.Meta.Votes);
            Assert.Equal(0, meta.GlobalMeta.Votes);
          }
        }
      }
    }

    [Fact]
    public async Task TestVoteOnQuestion__FromSingleUser__SetsVotesCountCorrectly()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "New Question", "Some question body");

        var questionService = fixture.Container.Resolve<IQuestionService>();
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var metadata = await questionService.GetQuestionMetadata(db, user, question.QuestionId.ToString());
            await questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
            {
              QuestionId = question.QuestionId.ToString(),
              RowVersion = PangulRowVersion.GetString(metadata.Meta.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();

            var meta = await questionService.GetQuestionMetadata(db, user, question.QuestionId.ToString());

            Assert.Equal(1, meta.Meta.Votes);
            Assert.Equal(1, meta.GlobalMeta.Votes);

            await questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
            {
              QuestionId = question.QuestionId.ToString(),
              RowVersion = PangulRowVersion.GetString(metadata.Meta.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();

            meta = await questionService.GetQuestionMetadata(db, user, question.QuestionId.ToString());

            Assert.Equal(1, meta.Meta.Votes);
            Assert.Equal(1, meta.GlobalMeta.Votes);
          }
        }
      }
    }

    [Fact]
    public async Task TestVoteOnQuestion__FromMultipleUsers__SetsVotesCountCorrectly()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin1");
        await fixture.UserHelper.CreateUser("admin2");
        await fixture.UserHelper.CreateUser("admin3");
        await fixture.UserHelper.CreateUser("admin4");
        await fixture.UserHelper.CreateUser("admin5");
        await fixture.UserHelper.CreateUser("admin6");

        var questionService = fixture.Container.Resolve<IQuestionService>();
        using (var db = new TestDbContext())
        {
          long questionId = 0;
          using (var user = await fixture.UserHelper.Become(db, "admin1"))
          {
            var question = await questionService.CreateQuestion(db, user, new CreateNewQuestion()
            {
              Title = "question",
              Body = "body",
              Tags = new[] {QuestionHelper.NewQuestionTag},
              Topic = Topic.DefaultTopic
            });

            await db.SaveChangesAsync();

            var metadata = await questionService.GetQuestionMetadata(db, user, question.QuestionId.ToString());
            await questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
            {
              QuestionId = question.QuestionId.ToString(),
              RowVersion = PangulRowVersion.GetString(metadata.Meta.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();
            questionId = question.QuestionId;
          }

          using (var user = await fixture.UserHelper.Become(db, "admin2"))
          {
            var metadata = await questionService.GetQuestionMetadata(db, user, questionId.ToString());
            await questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
            {
              QuestionId = questionId.ToString(),
              RowVersion = PangulRowVersion.GetString(metadata.Meta.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();
          }

          using (var user = await fixture.UserHelper.Become(db, "admin3"))
          {
            var metadata = await questionService.GetQuestionMetadata(db, user, questionId.ToString());
            await questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
            {
              QuestionId = questionId.ToString(),
              RowVersion = PangulRowVersion.GetString(metadata.Meta.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();
          }

          using (var user = await fixture.UserHelper.Become(db, "admin4"))
          {
            var metadata = await questionService.GetQuestionMetadata(db, user, questionId.ToString());
            await questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
            {
              QuestionId = questionId.ToString(),
              RowVersion = PangulRowVersion.GetString(metadata.Meta.RowVersion),
              Votes = 0
            });

            await db.SaveChangesAsync();
          }

          using (var user = await fixture.UserHelper.Become(db, "admin5"))
          {
            var metadata = await questionService.GetQuestionMetadata(db, user, questionId.ToString());
            await questionService.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
            {
              QuestionId = questionId.ToString(),
              RowVersion = PangulRowVersion.GetString(metadata.Meta.RowVersion),
              Votes = -1
            });

            await db.SaveChangesAsync();
          }

          using (var user = await fixture.UserHelper.Become(db, "admin1"))
          {
            var meta = await questionService.GetQuestionMetadata(db, user, questionId.ToString());
            Assert.Equal(2, meta.GlobalMeta.Votes);
          }
        }
      }
    }

    [Fact]
    public async Task TestMoveQuestionToDifferentTopic__FromExistingTopicToNewTopic__CreatesNewTopicAndMovesQuestionToIt()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.TopicHelper.RequireTopic("admin", "one");
        await fixture.TopicHelper.RequireTopic("admin", "two");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "Some question", "Body", "one");

        var service = fixture.Container.Resolve<IQuestionService>();
        var searcher = fixture.Container.Resolve<IInternalSearchService>();
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            await service.UpdateQuestionTopic(db, user, new UpdateQuestionTopic()
            {
              QuestionId = question.QuestionId.ToString(),
              RowVersion = PangulRowVersion.GetString(question.RowVersion),
              TopicName = "two"
            });

            await db.SaveChangesAsync();
          }
        }

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var noMatches = await searcher.SearchQuestions(db, user, "topic:one question", 0, 10);
            var matches = await searcher.SearchQuestions(db, user, "topic:two question", 0, 10);

            Assert.Single(matches.IdentityList);
            Assert.Empty(noMatches.IdentityList);
          }
        }
      }
    }
  }
}