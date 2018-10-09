using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;

namespace Pangul.Services.Db.Questions
{
  public class GetQuestionGlobalMeta : IQuery<QuestionGlobalMeta>
  {
    public UserContext UserContext { get; set; }
    public long QuestionId { get; set; }

    public void GuardPropertyValues()
    {
    }

    public void GuardRelatedObjects()
    {
      this.GuardRelatedObject(() => UserContext != null, "UserContext");
    }

    public void DeriveProperties()
    {
    }
  }
}