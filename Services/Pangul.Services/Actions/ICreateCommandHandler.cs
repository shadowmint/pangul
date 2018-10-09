using System.Threading.Tasks;
using Pangul.Core.Data;

namespace Pangul.Services.Actions
{
  public interface ICreateCommandHandler<in TCommand, TResult> : ICommandHandler where TCommand : ICommand
  {
    Task<TResult> Execute(PangulDbContext context, TCommand command);
  }
}