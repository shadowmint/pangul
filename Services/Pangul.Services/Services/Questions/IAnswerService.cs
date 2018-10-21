using System.Collections.Generic;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Model;

namespace Pangul.Services.Services.Questions
{
  public interface IAnswerService
  {
    /// <summary>
    /// Return a single answer.
    /// </summary>
    Task<Answer> GetAnswer(PangulDbContext db, UserContext user, string answerId);

    /// <summary>
    /// Add an answer for an existing question.
    /// </summary>
    Task<Answer> CreateAnswer(PangulDbContext db, UserContext user, string modelQuestionId, string answerBody);

    /// <summary>
    /// Get the user specific metadata about this question for this user.
    /// </summary>
    Task<AnswerMetaInternalModel> GetAnswerMetadata(PangulDbContext db, UserContext user, string questionId);

    /// <summary>
    /// Update the user specific metadata and global metadata for this question.
    /// </summary>
    Task<AnswerMetaInternalModel> UpdateAnswerMetadata(PangulDbContext db, UserContext user, UpdateAnswerMeta model);

    /// <summary>
    /// Update an existing answer, if the user has permission to do so. 
    /// </summary>
    Task<Answer> UpdateExistingAnswer(PangulDbContext db, UserContext userContext, UpdateAnswer model);
  }
}