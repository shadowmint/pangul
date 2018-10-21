using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure.Backup;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Internal.Cleanup;
using Pangul.Services.Internal.User;
using Pangul.Services.Model;
using Pangul.Services.Services.Questions;

namespace Pangul.Services.Concrete.Services.Questions
{
  public class PurgeService : IPurgeService, IService
  {
    private readonly ICommandHandler<PurgeQuestionData> _purgeQuestion;
    private readonly ICommandHandler<PurgeAnswerData> _purgeAnswer;
    private readonly IInternalDataBackupService _backupService;
    private readonly IQuestionService _questionService;
    private readonly IInternalUserPermissionService _internalUserPermissionService;
    private readonly IAnswerService _answerService;

    public PurgeService(ICommandHandler<PurgeQuestionData> purgeQuestion, ICommandHandler<PurgeAnswerData> purgeAnswer, IInternalDataBackupService backupService, IQuestionService questionService,
      IAnswerService answerService, IInternalUserPermissionService internalUserPermissionService)
    {
      _purgeQuestion = purgeQuestion;
      _purgeAnswer = purgeAnswer;
      _backupService = backupService;
      _questionService = questionService;
      _internalUserPermissionService = internalUserPermissionService;
      _answerService = answerService;
    }

    public async Task PurgeExistingQuestion(PangulDbContext db, UserContext user, string questionId, DataBackupConfiguration backupConfiguration)
    {
      var question = await _questionService.GetQuestion(db, user, questionId);
      if (question == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such question ({questionId})");
      }

      await _backupService.Backup(db, question, backupConfiguration);

      await _purgeQuestion.Execute(db, new PurgeQuestionData()
      {
        Question = question,
        UserContext = user
      });
    }

    public async Task PurgeExistingAnswer(PangulDbContext db, UserContext user, string answerId, DataBackupConfiguration backupConfiguration)
    {
      var answer = await _answerService.GetAnswer(db, user, answerId);
      if (answer == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such answer ({answerId})");
      }

      await _internalUserPermissionService.RequireWriteAccessFor(answer, user);
      
      _backupService.Backup(answer, backupConfiguration);

      await _purgeAnswer.Execute(db, new PurgeAnswerData()
      {
        Answer = answer,
        UserContext = user
      });
    }
  }
}