using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Data.Questions;
using Pangul.Core.Data.Topics;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Questions;
using Pangul.Services.Services;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;

namespace Pangul.Services.Tests.Helpers
{
  public class QuestionHelper
  {
    public static string NewQuestionTag = "NewQuestion";

    private readonly TestFixture _fixture;

    public QuestionHelper(TestFixture fixture)
    {
      _fixture = fixture;
    }

    public async Task<Question> CreateQuestion(string username, string title, string body, string topic = Topic.DefaultTopic)
    {
      var questionService = _fixture.Container.Resolve<IQuestionService>();
      using (var db = new TestDbContext())
      {
        using (var user = await _fixture.UserHelper.Become(db, username))
        {
          var question = await questionService.CreateQuestion(db, user, new CreateNewQuestion()
          {
            Title = title,
            Body = body,
            Tags = new[] {NewQuestionTag},
            Topic = topic,
          });

          await db.SaveChangesAsync();
          return question;
        }
      }
    }

    public async Task VoteForQuestion(string username, Question question, int votes = 1)
    {
      var service = _fixture.Container.Resolve<IQuestionService>();
      using (var db = new TestDbContext())
      {
        using (var user = await _fixture.UserHelper.Become(db, username))
        {
          await service.UpdateQuestionMetadata(db, user, new UpdateQuestionMeta()
          {
            RowVersion = PangulRowVersion.GetString(question.RowVersion),
            Votes = votes,
            QuestionId = question.QuestionId.ToString()
          });
          await db.SaveChangesAsync();
        }
      }
    }
  }
}