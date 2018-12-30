using System.Collections.Generic;
using NCore.Base.WebAuth;

namespace Pangul.Backend.Web.Configuration.Authentication.Providers
{
  public interface IAuthAndClaimsProvider
  {
    IEnumerable<IClaims> ClaimsFor(string username);
    bool Authorize(string username, string token);
  }
}