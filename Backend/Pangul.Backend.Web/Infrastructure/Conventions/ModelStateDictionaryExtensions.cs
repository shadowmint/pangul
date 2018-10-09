using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Pangul.Backend.Web.Infrastructure.Conventions
{
  public static class ModelStateDictionaryExtensions
  {
    public static StandardResponse StandardError(this ModelStateDictionary modelState)
    {
      var response = new StandardResponse()
      {
        Success = false,
        Result = StandardResponseCode.ValidationError,
        Errors = new Dictionary<string, string[]>()
      };

      foreach (var key in modelState.Keys.Where(i => modelState[i].Errors.Count > 0))
      {
        response.Errors[key] = modelState[key].Errors.Select(error => error.ErrorMessage).ToArray();
      }

      return response;
    }
  }
}