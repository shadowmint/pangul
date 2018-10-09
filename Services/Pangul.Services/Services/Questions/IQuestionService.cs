using System.Collections.Generic;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Core.Data.Topics;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure;
using Pangul.Services.Model;

namespace Pangul.Services.Services.Questions
{
  public interface IQuestionService
  {
    /// <summary>
    /// Create a new question owned by the given user.
    /// We also check if the user has permission to create questions before creating them.
    /// </summary>
    Task<Question> CreateQuestion(PangulDbContext db, UserContext user, CreateNewQuestion model);

    /// <summary>
    /// Return the full details of a single question.
    /// </summary>
    Task<Question> GetQuestion(PangulDbContext db, UserContext user, string questionId);

    /// <summary>
    /// Update an existing question.
    /// </summary>
    Task<Question> UpdateQuestion(PangulDbContext db, UserContext user, UpdateQuestion model);

    /// <summary>
    /// Get the user specific metadata about this question for this user.
    /// </summary>
    Task<QuestionMetaInternalModel> GetQuestionMetadata(PangulDbContext db, UserContext user, string questionId);

    /// <summary>
    /// Update the user specific metadata and global metadata for this question.
    /// </summary>
    Task<QuestionMetaInternalModel> UpdateQuestionMetadata(PangulDbContext db, UserContext user, UpdateQuestionMeta model);

    /// <summary>
    /// Update the topic for a question.
    /// </summary>
    Task UpdateQuestionTopic(PangulDbContext db, UserContext user, UpdateQuestionTopic model);
  }
}