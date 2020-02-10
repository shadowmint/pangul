using System.Threading.Tasks;
using Pangul.Core.Data.Questions;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Internal.User;
using Pangul.Services.Model;

namespace Pangul.Services.Concrete.Internal
{
  public class InternalUserPermissionService : IInternalUserPermissionService, IService
  {
    public Task<bool> HasWriteAccessFor(Answer answer, UserContext user)
    {
      if (answer == null) return Task.FromResult(false);
      var permittedAsOwner = answer.UserId == user.User.UserId;
      return Task.FromResult(permittedAsOwner);
    }

    public Task<bool> HasWriteAccessFor(Question question, UserContext user)
    {
      var permittedAsOwner = question.UserId == user.User.UserId;
      return Task.FromResult(permittedAsOwner);
    }

    public async Task RequireWriteAccessFor(Answer answer, UserContext user)
    {
      RequireAccess(await HasWriteAccessFor(answer, user));
    }

    public async Task RequireWriteAccessFor(Question question, UserContext user)
    {
      RequireAccess(await HasWriteAccessFor(question, user));
    }

    private void RequireAccess(bool hasAccess)
    {
      if (!hasAccess)
      {
        throw new CommandValidationException(CommandValidationType.PermissionDenied, "WriteAccess Denied");
      }
    }
  }
}