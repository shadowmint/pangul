using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Topics;
using Pangul.Services.Actions;
using Pangul.Services.Db.Topics;
using Pangul.Services.Infrastructure.Errors;

namespace Pangul.Services.Concrete.Db.Topics
{
  public class TopicCommandHandler : ICommandHandler<UpdateTopic>, ICommandHandler<DeleteTopic>, ICreateCommandHandler<CreateTopic, Topic>
  {
    private readonly IQueryHandler<GetTopic, Topic> _getTopic;

    public TopicCommandHandler(IQueryHandler<GetTopic, Topic> getTopic)
    {
      _getTopic = getTopic;
    }

    public async Task Execute(PangulDbContext db, UpdateTopic command)
    {
      command.Validate();

      var topic = await _getTopic.Execute(db, new GetTopic()
      {
        TopicId = command.TopicId,
        RowVersion = command.RowVersion,
        UserContext = command.UserContext
      });

      if (topic == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such topic ({command.DerivedProperties.TopicId})");
      }

      command.ApplyTo(topic);
    }

    public async Task Execute(PangulDbContext db, DeleteTopic command)
    {
      command.Validate();
      
      var topic = await _getTopic.Execute(db, new GetTopic()
      {
        TopicId = command.TopicId,
        RowVersion = command.RowVersion,
        UserContext = command.UserContext
      });
      
      if (topic == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such topic ({command.DerivedProperties.TopicId})");
      }

      // We cannot delete a topic if there are still attached questions
      var anyQuestions = await db.Question.AnyAsync(i => i.TopicId == command.DerivedProperties.TopicId);
      if (anyQuestions)
      {
        throw new PangulCommandFailedException(CommandFailureType.ConstraintFailed,
          $"Unable to delete topic {command.DerivedProperties.TopicId} while there are still attached questions");
      }

      db.Topic.Remove(topic);
    }

    public Task<Topic> Execute(PangulDbContext db, CreateTopic command)
    {
      command.Validate();
      var instance = new Topic()
      {
        Icon = null,
        Name = command.DerivedProperties.TopicName,
        TimeCreated = DateTimeOffset.Now
      };
      db.Topic.Add(instance);
      return Task.FromResult(instance);
    }
  }
}