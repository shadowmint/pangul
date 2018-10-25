using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Pangul.Backend.Web.Configuration.Core;
using Pangul.Backend.Web.Infrastructure.Conventions;
using Pangul.Services.Services;

namespace Pangul.Backend.Web.Controllers.Users
{
  public class UsersControllerService
  {
    private readonly IUserService _userService;

    public UsersControllerService(IUserService userService)
    {
      _userService = userService;
    }

    public async Task<StandardResponse> GetUser(ClaimsPrincipal identity, GetUserViewModel model, ModelStateDictionary modelState)
    {
      if (!modelState.IsValid)
      {
        return modelState.StandardError();
      }

      using (var db = new ServiceDb())
      {
        using (var user = await _userService.Become(db, identity, null))
        {
          var otherUser = await _userService.Get(db, model.Id);
          return StandardResponse.For(UserViewModel.From(otherUser));
        }
      }
    }
  }
}