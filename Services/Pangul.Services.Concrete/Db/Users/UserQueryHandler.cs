using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Users;
using Pangul.Services.Actions;
using Pangul.Services.Db.User;
using Pangul.Services.Infrastructure.Errors;

namespace Pangul.Services.Concrete.Db.Users
{
  public class UserQueryHandler : IQueryHandler<GetUserDetails, User>, IQueryHandler<GetUserContact, UserContact>,
    IQueryHandler<GetAllLoginUsernames, IEnumerable<IQueryable<string>>>
  {
    public async Task<User> Execute(PangulDbContext context, GetUserDetails query)
    {
      query.Validate();

      // If this is a username query
      if (query.QueryByUsername)
      {
        var matchingLogin = await context.Logins.FirstOrDefaultAsync(i => i.Username == query.Login);
        if (matchingLogin == null)
        {
          matchingLogin = context.Logins.Local.FirstOrDefault(i => i.Username == query.Login);
          if (matchingLogin == null)
          {
            throw new PangulCommandFailedException(CommandFailureType.MissingData, "No match for the given username");
          }
        }

        var user = await context.Users.FirstOrDefaultAsync(i => i.LoginId == matchingLogin.LoginId);
        if (user == null)
        {
          user = context.Users.Local.FirstOrDefault(i => i.UserId == matchingLogin.LoginId);
          if (user == null)
          {
            throw new PangulCommandFailedException(CommandFailureType.MissingData, "No User record for Login");
          }
        }

        user.Login = matchingLogin;
        return user;
      }

      // Query by id as a fallback
      return await context.Users.Where(i => i.UserId == query.Derived.UserId)
        .Include(i => i.Login)
        .FirstOrDefaultAsync();
    }

    public async Task<UserContact> Execute(PangulDbContext context, GetUserContact query)
    {
      query.Validate();

      var contactQuery = from user in context.Users
        join contact in context.UserContacts on user.UserContactId equals contact.UserContactId
        where user.UserId == query.UserId
        select contact;

      var match = await contactQuery.FirstOrDefaultAsync();
      if (match == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, "No matching record found");
      }

      return match;
    }

    public Task<IEnumerable<IQueryable<string>>> Execute(PangulDbContext context, GetAllLoginUsernames query)
    {
      var deferred = new TaskCompletionSource<IEnumerable<IQueryable<string>>>();
      deferred.SetResult(new[]
      {
        context.Logins.Select(i => i.Username).OrderBy((i) => i),
        context.Logins.Local.Select(i => i.Username).AsQueryable()
      });
      return deferred.Task;
    }
  }
}