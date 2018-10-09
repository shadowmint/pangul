using System.Collections.Generic;
using System.IO.Abstractions;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Infrastructure.Backup;
using Pangul.Services.Model;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Story
{
  public class DeleteDataUserStoryTests
  {
    [Fact]
    public async Task TestDeletingAQuestion__WithAnswers__DeletesTheQuestionAndAnswersAndCreatesABackupRecord()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.UserHelper.CreateUser("user1");
        await fixture.UserHelper.CreateUser("user2");
        await fixture.UserHelper.CreateUser("user3");

        var question = await fixture.QuestionHelper.CreateQuestion("admin", "test question", "...HELLO!--");
        await fixture.QuestionHelper.VoteForQuestion("admin", question, 1);
        await fixture.QuestionHelper.VoteForQuestion("user1", question, 1);
        await fixture.QuestionHelper.VoteForQuestion("user2", question, -1);

        Answer answer = null;
        for (var i = 0; i < 10; i++)
        {
          answer = await fixture.AnswerHelper.AnswerQuestion("admin", question, "some answer");
          await fixture.AnswerHelper.VoteForAnswer("admin", answer, 1);
          await fixture.AnswerHelper.VoteForAnswer("user1", answer, 1);
          await fixture.AnswerHelper.VoteForAnswer("user2", answer, 1);
          await fixture.AnswerHelper.VoteForAnswer("user3", answer, 1);
        }

        var purgeService = fixture.Container.Resolve<IPurgeService>();
        var questionService = fixture.Container.Resolve<IQuestionService>();
        var answerService = fixture.Container.Resolve<IAnswerService>();
        var fileSystem = fixture.Container.Resolve<IFileSystem>();

        using (var transaction = new TestDbContext().WithTransaction())
        {
          using (var user = await fixture.UserHelper.Become(transaction.Db, "admin"))
          {
            await purgeService.PurgeExistingQuestion(transaction.Db, user, question.QuestionId.ToString(), new DataBackupConfiguration()
            {
              Serializer = new JsonBackupSerializer(),
              BackupOutputFolder = "/tmp"
            });

            await transaction.Db.SaveChangesAsync();
          }
        }

        // Check records are gone
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var resolvedQuestion = await questionService.GetQuestion(db, user, question.QuestionId.ToString());
            Assert.Null(resolvedQuestion);

            var resolvedAnswer = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            Assert.Null(resolvedAnswer);
          }
        }

        // Check we made a backup
        var content = fileSystem.File.ReadAllText($"/tmp/question{question.QuestionId}.json");
        Assert.True(content.Length > 0);
        Assert.Contains("HELLO", content);
      }
    }

    [Fact]
    public async Task TestDeletingAnAnswer__WithOtherAnswers__DeletesTheAnswerButNotOtherAnswersOrQuestionAndLeavesABackup()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.UserHelper.CreateUser("user1");
        await fixture.UserHelper.CreateUser("user2");
        await fixture.UserHelper.CreateUser("user3");

        var question = await fixture.QuestionHelper.CreateQuestion("admin", "test question", "...HELLO!--");
        await fixture.QuestionHelper.VoteForQuestion("admin", question, 1);
        await fixture.QuestionHelper.VoteForQuestion("user1", question, 1);
        await fixture.QuestionHelper.VoteForQuestion("user2", question, -1);

        Answer answer = null;
        Answer otherAnswer = null;
        for (var i = 0; i < 10; i++)
        {
          answer = await fixture.AnswerHelper.AnswerQuestion("admin", question, "some answer");
          await fixture.AnswerHelper.VoteForAnswer("admin", answer, 1);
          await fixture.AnswerHelper.VoteForAnswer("user1", answer, 1);
          await fixture.AnswerHelper.VoteForAnswer("user2", answer, 1);
          await fixture.AnswerHelper.VoteForAnswer("user3", answer, 1);
          if (otherAnswer == null)
          {
            otherAnswer = answer;
          }
        }

        var purgeService = fixture.Container.Resolve<IPurgeService>();
        var questionService = fixture.Container.Resolve<IQuestionService>();
        var answerService = fixture.Container.Resolve<IAnswerService>();
        var fileSystem = fixture.Container.Resolve<IFileSystem>();

        using (var transaction = new TestDbContext().WithTransaction())
        {
          using (var user = await fixture.UserHelper.Become(transaction.Db, "admin"))
          {
            await purgeService.PurgeExistingAnswer(transaction.Db, user, answer.AnswerId.ToString(), new DataBackupConfiguration()
            {
              Serializer = new JsonBackupSerializer(),
              BackupOutputFolder = "/tmp"
            });

            await transaction.Db.SaveChangesAsync();
          }
        }

        // Check only deleted records are gone
        using (var db = new TestDbContext())
        {
          using (var user = await fixture.UserHelper.Become(db, "admin"))
          {
            var resolvedAnswer = await answerService.GetAnswer(db, user, answer.AnswerId.ToString());
            Assert.Null(resolvedAnswer);

            var resolvedQuestion = await questionService.GetQuestion(db, user, question.QuestionId.ToString());
            Assert.NotNull(resolvedQuestion);

            var resolvedAnswer2 = await answerService.GetAnswer(db, user, otherAnswer.AnswerId.ToString());
            Assert.NotNull(resolvedAnswer2);
          }
        }

        // Check we made a backup
        var content = fileSystem.File.ReadAllText($"/tmp/answer{answer.AnswerId}.json");
        Assert.True(content.Length > 0);
        Assert.Contains("answer", content);
      }
    }
  }
}