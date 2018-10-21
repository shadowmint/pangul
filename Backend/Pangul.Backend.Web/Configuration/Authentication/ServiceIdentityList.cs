using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using NCore.Base.WebAuth;
using Pangul.Backend.Web.Configuration.Authentication.Infrastructure;
using Pangul.Backend.Web.Configuration.Authentication.Policy;
using Pangul.Backend.Web.Configuration.Core;
using Pangul.Services.Services;
using Pangul.Services.Services.Auth;

namespace Pangul.Backend.Web.Configuration.Authentication
{
  public class ServiceIdentityList : IPangulAuthProvider
  {
    private readonly IUserService _userService;

    private readonly Dictionary<string, string> _users = new Dictionary<string, string>
    {
      {"admin", "admin"},
      {"doug", "doug"}
    };

    private readonly Dictionary<string, IClaims[]> _userClaims = new Dictionary<string, IClaims[]>
    {
      {
        "doug", new IClaims[]
        {
          new PangulUser(),
          new PolicyCanCreateQuestion(),
          new PolicyCanDeleteAnswer(),
        }
      },
      {
        "admin", new IClaims[]
        {
          new PangulUser(),
          new PangulAdmin(),
          new PolicyCanDeleteTopic(),
          new PolicyCanDeleteAnswer(),
          new PangulAdminDatabase(),
          new PolicyCanCreateQuestion()
        }
      }
    };

    public ServiceIdentityList(IUserService userService)
    {
      _userService = userService;
    }

    public async Task<bool> TryAuthorize<TAuth, TContext>(string username, TAuth authenticationToken, TContext authenticationContext)
    {
      var authContext = authenticationContext as ServiceAuthContext;
      if (authContext == null) return false;

      var token = authenticationToken as string;
      if (string.IsNullOrEmpty(username)) return false;
      if (string.IsNullOrEmpty(token)) return false;

      var success = _users.ContainsKey(username) && token.Equals(_users[username]);

      if (success)
      {
        authContext.ClaimsForUser = CollectAllClaimsFor(_userClaims[token]);
      }

      if (success)
      {
        await RequireUserRecordForUser(username);
      }

      return success;
    }

    private async Task RequireUserRecordForUser(string username)
    {
      using (var db = new ServiceDb())
      {
        try
        {
          await _userService.Become(db, username, null);
        }
        catch (Exception)
        {
          await _userService.Create(db, username);
          await db.SaveChangesAsync();
        }
      }
    }

    private static Claim[] CollectAllClaimsFor(IEnumerable<IClaims> userClaims)
    {
      var collection = new Dictionary<string, List<string>>();
      foreach (var claimGroup in userClaims)
      {
        foreach (var claim in claimGroup.Claims)
        {
          if (!collection.ContainsKey(claim.Type))
          {
            collection[claim.Type] = new List<string>();
          }

          if (!collection[claim.Type].Contains(claim.Value))
          {
            collection[claim.Type].Add(claim.Value);
          }
        }
      }

      var results = new List<Claim>();
      foreach (var key in collection.Keys)
      {
        foreach (var value in collection[key])
        {
          results.Add(new Claim(key, value, "string", "pangul"));
        }
      }

      return results.ToArray();
    }

    public class ServiceAuthContext
    {
      /// <summary>
      /// The name of the API resource this user is trying to access.
      /// </summary>
      public ServiceAuthType ApiResource { get; set; }

      /// <summary>
      /// All the claims to assign to this user once they're logged in.
      /// </summary>
      public Claim[] ClaimsForUser { get; set; }
    }
  }
}