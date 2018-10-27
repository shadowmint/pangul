using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using NCore.Base.WebAuth;

namespace Pangul.Backend.Web.Configuration.Authentication.Policy
{
  public class PolicyCanDeleteTopic : IPolicy, IClaims
  {
    public void Require(AuthorizationPolicyBuilder policyOptions)
    {
      policyOptions.AuthenticationSchemes.Add(ServiceAuthConsts.AuthenticationScheme);
      policyOptions.RequireAuthenticatedUser();
      policyOptions.RequireClaim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser);
      policyOptions.RequireClaim(ServiceAuthConsts.ClaimCanDelete, ServiceAuthConsts.ClaimTargetTopic);
    }

    public IEnumerable<Claim> Claims => new[]
    {
      new Claim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser),
      new Claim(ServiceAuthConsts.ClaimCanDelete, ServiceAuthConsts.ClaimTargetTopic), 
    };

    string IPolicy.PolicyName => PolicyName;

    public const string PolicyName = ServiceAuthConsts.ClaimTargetTopic;
  }
}
namespace Pangul.Backend.Web.Configuration.Authentication.Policy
{
}