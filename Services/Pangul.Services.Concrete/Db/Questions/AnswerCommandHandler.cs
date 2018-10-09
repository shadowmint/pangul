using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Internal.User;

namespace Pangul.Services.Concrete.Db.Questions
{
    public class AnswerCommandHandler :
        ICreateCommandHandler<CreateNewAnswer, Answer>,
        ICommandHandler<UpdateAnswer>
    {
        private readonly IInternalUserPermissionService _permissionService;
        private readonly IQueryHandler<GetQuestion, Question> _getQuestion;
        private readonly IQueryHandler<GetAnswer, Answer> _getAnswer;

        public AnswerCommandHandler(IInternalUserPermissionService permissionService, IQueryHandler<GetQuestion, Question> getQuestion, IQueryHandler<GetAnswer, Answer> getAnswer)
        {
            _permissionService = permissionService;
            _getQuestion = getQuestion;
            _getAnswer = getAnswer;
        }

        public async Task<Answer> Execute(PangulDbContext db, CreateNewAnswer command)
        {
            command.Validate();

            // Fetch the question
            var question = await _getQuestion.Execute(db, new GetQuestion()
            {
                UserContext = command.UserContext,
                QuestionId = command.QuestionId,
                LightWeightOnly = true,
                IgnoreRowVersion = true
            });

            if (question == null)
            {
                throw new PangulCommandFailedException(CommandFailureType.InvalidRelation, $"No such question: {command.QuestionId}");
            }

            // Create answer
            var answer = new Answer()
            {
                Body = command.Body,
                User = command.UserContext.User,
                QuestionId = question.QuestionId,
                AnswerGlobalMeta = new AnswerGlobalMeta()
                {
                    Votes = 0
                }
            };

            await db.Answer.AddAsync(answer);

            // Return instance
            return answer;
        }

        public async Task Execute(PangulDbContext db, UpdateAnswer command)
        {
            command.Validate();

            // Fetch the answer
            var answer = await _getAnswer.Execute(db, new GetAnswer()
            {
                UserContext = command.UserContext,
                AnswerId = command.AnswerId,
                RowVersion = command.RowVersion
            });

            if (answer == null)
            {
                throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such answer ({command.AnswerId}, {command.RowVersion})");
            }
            
            // Verify user has permission
            await _permissionService.RequireWriteAccessFor(answer, command.UserContext);
           
            // Update the answer
            answer.Body = command.NewBody;
        }
    }
}