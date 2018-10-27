using System.Security.Claims;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Core.Data.Users;
using Pangul.Services.Infrastructure;
using Pangul.Services.Model;

namespace Pangul.Services.Services
{
  public interface IUserService
  {
    /// <summary>
    /// Create new user.
    /// </summary>
    Task<User> Create(PangulDbContext db, string username);

    /// <summary>
    /// Return a context for the given username, disposing of the previous user context.
    /// </summary>
    Task<UserContext> Become(PangulDbContext db, string username, UserContext currentUser = null);

    /// <summary>
    /// Return a context for the given username, disposing of the previous user context. 
    /// </summary>
    Task<UserContext> Become(PangulDbContext db, ClaimsPrincipal identity, UserContext currentUser = null);

    /// <summary>
    /// Return a user, by id.
    /// </summary>
    Task<User> Get(PangulDbContext db, string modelId);
    
    /// <summary>
    /// List all users; this is a super expensive query, so it only returns the usernames.
    /// Remember that a User may or may not have a Login associated with it; but every login
    /// has one unique user record.
    /// </summary>
    Task<PaginatedResultSet<string>> GetLogins(PangulDbContext db, int page = 0, int pageSize = 10);
  }
}