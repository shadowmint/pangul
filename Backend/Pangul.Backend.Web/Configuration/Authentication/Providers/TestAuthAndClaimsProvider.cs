using System.Collections.Generic;
using NCore.Base.WebAuth;
using Pangul.Backend.Web.Configuration.Authentication.Policy;

namespace Pangul.Backend.Web.Configuration.Authentication.Providers
{
  public class TestAuthAndClaimsProvider : IAuthAndClaimsProvider
  {
    private readonly Dictionary<string, string> _users = new Dictionary<string, string>
    {
      {"admin", "admin"},
      {"doug", "doug"},
    };

    private readonly Dictionary<string, IClaims[]> _userClaims = new Dictionary<string, IClaims[]>
    {
      {
        "doug", new IClaims[]
        {
          new PangulUser(),
          new PangulAdmin(),
          new PolicyCanDeleteTopic(),
          new PolicyCanDeleteAnswer(),
          new PolicyCanDeleteQuestion(),
          new PangulAdminDatabase(),
          new PolicyCanCreateQuestion()
        }
      },

      {
        "admin", new IClaims[]
        {
          new PangulUser(),
          new PangulAdmin(),
          new PolicyCanDeleteTopic(),
          new PolicyCanDeleteAnswer(),
          new PolicyCanDeleteQuestion(),
          new PangulAdminDatabase(),
          new PolicyCanCreateQuestion()
        }
      }
    };

    public bool Authorize(string username, string token)
    {
      return _users.ContainsKey(username) && token.Equals(_users[username]);
    }

    public IEnumerable<IClaims> ClaimsFor(string username)
    {
      if (!_userClaims.ContainsKey(username))
      {
        return new IClaims[] { };
      }

      return _userClaims[username];
    }
  }
}