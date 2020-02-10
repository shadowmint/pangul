using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Users;
using Pangul.Services.Infrastructure;
using Pangul.Services;
using Pangul.Services.Actions;
using Pangul.Services.Db.User;
using Pangul.Services.Infrastructure.Errors;
using Pangul.Services.Model;
using Pangul.Services.Services;

namespace Pangul.Services.Concrete.Services
{
  public class UserService : IUserService, IService
  {
    private readonly ICommandHandler<CreateNewUser> _createNewUser;
    private readonly IQueryHandler<GetUserDetails, User> _getUserDetails;
    private readonly IQueryHandler<GetAllLoginUsernames, IEnumerable<IQueryable<string>>> _getAllLoginUsernames;

    public UserService(ICommandHandler<CreateNewUser> createNewUser, IQueryHandler<GetUserDetails, User> getUserDetails,
      IQueryHandler<GetAllLoginUsernames, IEnumerable<IQueryable<string>>> getAllLoginUsernames)
    {
      _createNewUser = createNewUser;
      _getUserDetails = getUserDetails;
      _getAllLoginUsernames = getAllLoginUsernames;
    }

    private Task<User> GetByUsername(PangulDbContext db, string usernmae)
    {
      try
      {
        return _getUserDetails.Execute(db, new GetUserDetails() {Login = usernmae});
      }
      catch (Exception error)
      {
        throw new PangulCommandFailedException(CommandFailureType.TransactionFailed, error);
      }
    }

    public async Task<User> Get(PangulDbContext db, string userId)
    {
      return await _getUserDetails.Execute(db, new GetUserDetails()
      {
        UserId = userId
      });
    }

    public async Task<User> Create(PangulDbContext db, string username)
    {
      try
      {
        await _createNewUser.Execute(db, new CreateNewUser()
        {
          Username = username,
        });
        return await GetByUsername(db, username);
      }
      catch (Exception error)
      {
        throw new PangulCommandFailedException(CommandFailureType.TransactionFailed, error);
      }
    }

    public async Task<UserContext> Become(PangulDbContext db, string username, UserContext currentUser = null)
    {
      try
      {
        currentUser?.Dispose();
        var user = await GetByUsername(db, username);
        return new UserContext()
        {
          User = user,
          Login = user.Login,
        };
      }
      catch (Exception error)
      {
        throw new PangulCommandFailedException(CommandFailureType.TransactionFailed, error);
      }
    }

    public Task<UserContext> Become(PangulDbContext db, ClaimsPrincipal identity, UserContext currentUser)
    {
      return Become(db, identity.Identity.Name, currentUser);
    }

    public async Task<PaginatedResultSet<string>> GetLogins(PangulDbContext db, int page, int pageSize)
    {
      var allLogins = await _getAllLoginUsernames.Execute(db, new GetAllLoginUsernames());
      return new PaginatedResultSet<string>(allLogins, page, pageSize);
    }
  }
}