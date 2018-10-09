using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Model;

namespace Pangul.Services.Internal.Questions
{
  public interface IInternalQuestionMetaService
  {
    /// <summary>
    /// Return the metadata for a user for a question.
    /// If the user has no metadata for this question, create it.
    /// </summary>
    Task<QuestionMeta> RequireQuestionMetaForUser(PangulDbContext db, UserContext user, string questionId);

    /// <summary>
    /// Apply a global update to the state of the question.
    /// This is a highly concurrent operation.
    /// </summary>
    Task UpdateQuestionGlobalMetadata(PangulDbContext db, UserContext user, UpdateQuestionGlobalMeta model);

    /// <summary>
    /// Return the metadata for a user for an answer.
    /// If the user has no metadata for this answer, create it.
    /// </summary>
    Task<AnswerMeta> RequireAnswerMetaForUser(PangulDbContext db, UserContext user, string answerId);
    
    /// <summary>
    /// Apply a global update to the state of the answer.
    /// This is a highly concurrent operation.
    /// </summary>
    Task UpdateAnswerGlobalMetadata(PangulDbContext db, UserContext user, UpdateAnswerGlobalMeta model);
  }
}