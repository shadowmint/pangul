using System.Threading.Tasks;
using Pangul.Core.Data.Questions;
using Pangul.Services.Model;

namespace Pangul.Services.Internal.User
{
    public interface IInternalUserPermissionService
    {
        Task<bool> HasWriteAccessFor(Answer answer, UserContext user);
        Task<bool> HasWriteAccessFor(Question answer, UserContext user);
        Task RequireWriteAccessFor(Answer answer, UserContext user);
        Task RequireWriteAccessFor(Question question, UserContext user);
    }
}