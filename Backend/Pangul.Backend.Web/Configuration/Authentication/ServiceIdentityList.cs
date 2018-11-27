using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using NCore.Base.WebAuth;
using Pangul.Backend.Web.Configuration.Authentication.Infrastructure;
using Pangul.Backend.Web.Configuration.Authentication.Providers;
using Pangul.Backend.Web.Configuration.Settings;
using Pangul.Backend.Web.Core;
using Pangul.Services.Services;
using Pangul.Services.Services.Auth;

namespace Pangul.Backend.Web.Configuration.Authentication
{
  public class ServiceIdentityList : IPangulAuthProvider
  {
    private readonly IUserService _userService;

    public ServiceIdentityList(IUserService userService)
    {
      _userService = userService;
    }

    public async Task<bool> TryAuthorize<TAuth, TContext>(string username, TAuth authenticationToken, TContext authenticationContext)
    {
      var settings = new ServiceSettings();
      var policy = GetPolicyFor(settings.Auth.AuthProvider);

      var authContext = authenticationContext as ServiceAuthContext;
      if (authContext == null) return false;

      var token = authenticationToken as string;
      if (string.IsNullOrEmpty(username)) return false;
      if (string.IsNullOrEmpty(token)) return false;

      var success = policy.Authorize(username, token);

      if (success)
      {
        authContext.ClaimsForUser = CollectAllClaimsFor(policy.ClaimsFor(username));
      }

      if (success)
      {
        await RequireUserRecordForUser(username);
      }

      return success;
    }

    private IAuthAndClaimsProvider GetPolicyFor(ServiceAuthSettings.AuthProviderType authAuthProvider)
    {
      switch (authAuthProvider)
      {
        case ServiceAuthSettings.AuthProviderType.Test:
          return new TestAuthAndClaimsProvider();
        default:
          throw new ArgumentOutOfRangeException(nameof(authAuthProvider), authAuthProvider, null);
      }
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