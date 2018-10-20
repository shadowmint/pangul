using System;
using System.Linq;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Internal.User;

namespace Pangul.Services.Concrete.Db.Questions
{
  public class QuestionCommandHandler :
    ICreateCommandHandler<CreateNewQuestion, Question>,
    ICommandHandler<UpdateQuestion>,
    ICommandHandler<UpdateQuestionTopic>
  {
    private readonly IQueryHandler<GetQuestion, Question> _getQuestion;
    private readonly IInternalUserPermissionService _internalUserPermissionService;

    public QuestionCommandHandler(IQueryHandler<GetQuestion, Question> getQuestion,
      IInternalUserPermissionService internalUserPermissionService)
    {
      _getQuestion = getQuestion;
      _internalUserPermissionService = internalUserPermissionService;
    }

    public async Task Execute(PangulDbContext db, UpdateQuestion command)
    {
      command.Validate();

      // Get existing question
      var question = await _getQuestion.Execute(db, new GetQuestion()
      {
        UserContext = command.UserContext,
        LightWeightOnly = false,
        QuestionId = command.QuestionId,
        RowVersion = command.RowVersion,
      });

      if (question == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such question ({command.QuestionId}, {command.RowVersion})");
      }

      // Verify user has permission
      await _internalUserPermissionService.RequireWriteAccessFor(question, command.UserContext);

      // Get tag lists
      var tags = command.Tags ?? new string[0];
      var newTags = tags.Where(i => question.Tags.All(j => j.Tag != i) && !string.IsNullOrWhiteSpace(i));
      var dropTags = question.Tags.Where(i => tags.All(j => j != i.Tag));

      // Update properties
      command.ApplyTo(question);

      // Drop old tags
      foreach (var tag in dropTags)
      {
        db.QuestionTag.Remove(tag);
      }

      // Create tags for those not present
      await db.QuestionTag.AddRangeAsync(newTags.Select(t => new QuestionTag
      {
        Tag = t,
        QuestionId = question.QuestionId
      }));
    }

    public async Task<Question> Execute(PangulDbContext db, CreateNewQuestion command)
    {
      command.Validate();

      // Create question
      var question = new Question()
      {
        Title = command.Title,
        Body = command.Body,
        User = command.UserContext.User,
        TopicId = command.TopicRef.TopicId,
        TimeCreated = DateTimeOffset.Now,
        QuestionGlobalMeta = new QuestionGlobalMeta()
        {
          Votes = 0
        }
      };

      await db.Question.AddAsync(question);

      // Create tags
      if (command.Tags != null && command.Tags.Length > 0)
      {
        await db.QuestionTag.AddRangeAsync(command.Tags.Where(t => !string.IsNullOrWhiteSpace(t)).Select(t => new QuestionTag
        {
          Tag = t,
          QuestionId = question.QuestionId
        }));
      }

      // Return instance
      return question;
    }

    public async Task Execute(PangulDbContext db, UpdateQuestionTopic command)
    {
      command.Validate();

      // Get existing question
      var question = await _getQuestion.Execute(db, new GetQuestion()
      {
        UserContext = command.UserContext,
        LightWeightOnly = false,
        QuestionId = command.QuestionId,
        RowVersion = command.RowVersion,
      });

      if (question == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such question ({command.QuestionId}, {command.RowVersion})");
      }

      // Verify user has permission
      await _internalUserPermissionService.RequireWriteAccessFor(question, command.UserContext);

      question.TopicId = command.Derived.Topic.TopicId;
    }
  }
}