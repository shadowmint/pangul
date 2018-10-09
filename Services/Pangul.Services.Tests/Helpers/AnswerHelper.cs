using System.Threading.Tasks;
using Autofac;
using Pangul.Core.Data.Questions;
using Pangul.Core.Infrastructure;
using Pangul.Services.Db.Questions;
using Pangul.Services.Services.Questions;
using Pangul.Services.Tests.Fixtures;

namespace Pangul.Services.Tests.Helpers
{
  public class AnswerHelper
  {
    private readonly TestFixture _fixture;

    public AnswerHelper(TestFixture fixture)
    {
      _fixture = fixture;
    }

    public async Task<Answer> AnswerQuestion(string username, Question question, string answerBody)
    {
      var service = _fixture.Container.Resolve<IAnswerService>();
      using (var db = new TestDbContext())
      {
        using (var user = await _fixture.UserHelper.Become(db, username))
        {
          var rtn = await service.CreateAnswer(db, user, question.QuestionId.ToString(), answerBody);
          await db.SaveChangesAsync();
          return rtn;
        }
      }
    }

    public async Task VoteForAnswer(string username, Answer answer, int votes = 1)
    {
      var service = _fixture.Container.Resolve<IAnswerService>();
      using (var db = new TestDbContext())
      {
        using (var user = await _fixture.UserHelper.Become(db, username))
        {
          await service.UpdateAnswerMetadata(db, user, new UpdateAnswerMeta()
          {
            RowVersion = PangulRowVersion.GetString(answer.RowVersion),
            Votes = votes,
            AnswerId = answer.AnswerId.ToString()
          });
          await db.SaveChangesAsync();
        }
      }
    }
  }
}