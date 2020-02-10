using System.Threading.Tasks;
using Pangul.Core.Data;

namespace Pangul.Services.Actions
{
    public interface ICommandHandler
    {
    }

    public interface ICommandHandler<in TCommand> : ICommandHandler where TCommand : ICommand
    {
        Task Execute(PangulDbContext context, TCommand command);
    }
}