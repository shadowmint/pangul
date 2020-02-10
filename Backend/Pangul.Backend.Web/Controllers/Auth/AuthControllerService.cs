using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NCore.Base.WebAuth;
using Pangul.Backend.Web.Configuration.Authentication;
using Pangul.Backend.Web.Configuration.Authentication.Infrastructure;
using Pangul.Backend.Web.Configuration.Settings;
using Pangul.Backend.Web.Controllers.Auth.ViewModels;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Backend.Web.Infrastructure.Errors;
using Pangul.Services.Services.Auth;

namespace Pangul.Backend.Web.Controllers.Auth
{
  internal class AuthControllerService
  {
    private readonly IPangulAuthService _pangulAuthService;
    private readonly IAuthService _auth;
    private readonly ServiceSettings _settings;

    public AuthControllerService(IPangulAuthService pangulAuthService, IAuthService auth)
    {
      _auth = auth;
      _pangulAuthService = pangulAuthService;
      _settings = new ServiceSettings();
    }

    public async Task<StandardResponse> Login(HttpContext httpContext, LoginViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      var authContext = new ServiceIdentityList.ServiceAuthContext();
      var isValid = await TryAuthorize(model.Username, model.Password, httpContext, authContext);
      if (!isValid)
      {
        throw new Exception($"Invalid login attempt for {model.Username}");
      }

      await _auth.SignInAsync(httpContext, model.Username, authContext.ClaimsForUser);
      return StandardResponse.ForSuccess();
    }

    public StandardResponse GetClaims(ClaimsPrincipal identity)
    {
      return StandardResponse.For(new
      {
        Token = identity.Identity.Name,
        Authenticated = identity.Identity.IsAuthenticated,
        Claims = identity.Claims.Select(i => $"{i.Type}:{i.Value}").ToArray()
      });
    }

    private async Task<bool> TryAuthorize(string username, string password, HttpContext httpContext,
      ServiceIdentityList.ServiceAuthContext authContext)
    {
      GuardIsAjaxRequest(httpContext);
      GuardHasValidReferrer(httpContext);
      GuardHasValidOrigin(httpContext);
      authContext.ApiResource = ServiceAuthType.Api;
      return await _pangulAuthService.TryAuthorize(username, password, authContext);
    }

    private void GuardHasValidOrigin(HttpContext httpContext)
    {
      var referrers = httpContext.Request.Headers.FirstOrDefault(i => i.Key == "Origin").Value.ToArray();
      var validRefers = _settings.Auth.ValidAuthReferrers;
      if (!validRefers.Any(i => referrers.Any(j => j == i)))
      {
        throw new WebRuntimeException(WebRuntimeErrorType.AuthenticationFailed, $"Bad header: Origin");
      }
    }

    private void GuardHasValidReferrer(HttpContext httpContext)
    {
      var referrers = httpContext.Request.Headers.FirstOrDefault(i => i.Key == "Referer")
        .Value
        .ToArray()
        .Select(i => i.TrimEnd('/'))
        .ToArray();

      var validRefers = _settings.Auth.ValidAuthReferrers;
      if (!validRefers.Any(i => referrers.Any(j => j.StartsWith(i))))
      {
        throw new WebRuntimeException(WebRuntimeErrorType.AuthenticationFailed, $"Bad header: Referer");
      }
    }

    private void GuardIsAjaxRequest(HttpContext httpContext)
    {
      var requstedWith = httpContext.Request.Headers.FirstOrDefault(i => i.Key == "X-Requested-With" || i.Key == "x-requested-with").Value.ToArray();
      if (!requstedWith.Contains("PANGUL"))
      {
        throw new WebRuntimeException(WebRuntimeErrorType.AuthenticationFailed, $"Bad header: X-Requested-With");
      }
    }
  }
}