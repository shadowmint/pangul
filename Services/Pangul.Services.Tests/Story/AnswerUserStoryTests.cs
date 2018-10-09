using System;
using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Story
{
  public class AnswerUserStoryTests
  {
    [Fact]
    public async Task TestCreateAnswer__WithTrivialData__CreatesAValidAnswer()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "Test", "test");
        var answerService = fixture.Container.Resolve<IAnswerService>();

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var answer = await answerService.CreateAnswer(db, user, question.QuestionId.ToString(), "Some answer body");
            await db.SaveChangesAsync();

            var answerCopy = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            Assert.Equal("Some answer body", answerCopy.Body);
          }
        }
      }
    }

    [Fact]
    public async Task TestVoteOnAnswer__WithTrivialData__CreatesAValidAnswerWithVotes()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin1");
        await fixture.UserHelper.CreateUser("admin2");
        await fixture.UserHelper.CreateUser("admin3");
        var question = await fixture.QuestionHelper.CreateQuestion("admin1", "Test", "test");
        var answer = await fixture.AnswerHelper.AnswerQuestion("admin1", question, "Some answer goes here");
        var answerService = fixture.Container.Resolve<IAnswerService>();

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin1"))
          {
            var copy = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            await answerService.UpdateAnswerMetadata(db, user, new UpdateAnswerMeta()
            {
              AnswerId = answer.AnswerId.ToString(),
              RowVersion = PangulRowVersion.GetString(copy.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();
          }
        }

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin2"))
          {
            var copy = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            await answerService.UpdateAnswerMetadata(db, user, new UpdateAnswerMeta()
            {
              AnswerId = answer.AnswerId.ToString(),
              RowVersion = PangulRowVersion.GetString(copy.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();
          }
        }

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin3"))
          {
            var copy = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            await answerService.UpdateAnswerMetadata(db, user, new UpdateAnswerMeta()
            {
              AnswerId = answer.AnswerId.ToString(),
              RowVersion = PangulRowVersion.GetString(copy.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync();
          }
        }

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin1"))
          {
            var copy = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            await answerService.UpdateAnswerMetadata(db, user, new UpdateAnswerMeta()
            {
              AnswerId = answer.AnswerId.ToString(),
              RowVersion = PangulRowVersion.GetString(copy.RowVersion),
              Votes = 1
            });

            await db.SaveChangesAsync(); // Does nothing, admin1 already voted
          }
        }

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin1"))
          {
            var meta = await answerService.GetAnswerMetadata(db, user, answer.AnswerId.ToString());
            Assert.Equal(1, meta.Meta.Votes);
            Assert.Equal(3, meta.GlobalMeta.Votes);
          }
        }
      }
    }

    [Fact]
    public async Task TestUpdateAnswer__WithTrivialData__UpdatesTheAnswerAndRowVersion()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "Test", "test");
        var answer = await fixture.AnswerHelper.AnswerQuestion("admin", question, "Some answer");
        var answerService = fixture.Container.Resolve<IAnswerService>();

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var updatedAnswer = await answerService.UpdateExistingAnswer(db, user, new UpdateAnswer()
            {
              AnswerId = answer.AnswerId.ToString(),
              NewBody = "Some answer body",
              RowVersion = PangulRowVersion.GetString(answer.RowVersion)
            });
            await db.SaveChangesAsync();
            Assert.Equal("Some answer body", updatedAnswer.Body);
            Assert.NotEqual(answer.RowVersion, updatedAnswer.RowVersion);

            var answerCopy = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            Assert.Equal("Some answer body", answerCopy.Body);
            Assert.NotEqual(answer.RowVersion, answerCopy.RowVersion);
          }
        }
      }
    }

    [Fact]
    public async Task TestUpdateAnswer__WithTheWrongRowVersion__DoesntUpdateAnything()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        var question = await fixture.QuestionHelper.CreateQuestion("admin", "Test", "test");
        var answer = await fixture.AnswerHelper.AnswerQuestion("admin", question, "Some answer");
        var answerService = fixture.Container.Resolve<IAnswerService>();

        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            await Assert.ThrowsAsync<PangulCommandFailedException>(async () =>
            {
              await answerService.UpdateExistingAnswer(db, user, new UpdateAnswer()
              {
                AnswerId = answer.AnswerId.ToString(),
                NewBody = "Some answer body",
                RowVersion = PangulRowVersion.GetString(Guid.NewGuid().ToByteArray())
              });
              await db.SaveChangesAsync();
            });

            var answerCopy = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            Assert.Equal("Some answer", answerCopy.Body);
          }
        }
      }
    }
  }
}