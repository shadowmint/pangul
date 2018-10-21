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
      policyOptions.RequireClaim(ServiceAuthConsts.ClaimCanDelete, ServiceAuthConsts.ClaimCanDeleteTopic);
    }

    public IEnumerable<Claim> Claims => new[]
    {
      new Claim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser),
      new Claim(ServiceAuthConsts.ClaimCanDelete, ServiceAuthConsts.ClaimCanDeleteTopic), 
    };

    string IPolicy.PolicyName => PolicyName;

    public const string PolicyName = ServiceAuthConsts.ClaimCanDeleteTopic;
  }
}
namespace Pangul.Backend.Web.Configuration.Authentication.Policy
{
  public class PolicyCanDeleteAnswer : IPolicy, IClaims
  {
    public void Require(AuthorizationPolicyBuilder policyOptions)
    {
      policyOptions.AuthenticationSchemes.Add(ServiceAuthConsts.AuthenticationScheme);
      policyOptions.RequireAuthenticatedUser();
      policyOptions.RequireClaim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser);
      policyOptions.RequireClaim(ServiceAuthConsts.ClaimCanDelete, ServiceAuthConsts.ClaimCanDeleteAnswer);
    }

    public IEnumerable<Claim> Claims => new[]
    {
      new Claim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser),
      new Claim(ServiceAuthConsts.ClaimCanDelete, ServiceAuthConsts.ClaimCanDeleteAnswer), 
    };

    string IPolicy.PolicyName => PolicyName;

    public const string PolicyName = ServiceAuthConsts.ClaimCanDeleteTopic;
  }
}