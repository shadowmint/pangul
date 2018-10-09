using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Pangul.Backend.Web.Infrastructure.Conventions
{
  public class StandardResponse
  {
    public bool Success { get; set; }

    public Dictionary<string, string[]> Errors { get; set; }

    [JsonConverter(typeof(StringEnumConverter))]
    public StandardResponseCode Result { get; set; }

    public static StandardResponse<T> For<T>(T data)
    {
      return new StandardResponse<T>()
      {
        Result = StandardResponseCode.Success,
        Success = true,
        Data = data
      };
    }

    public static StandardResponse ForError()
    {
      return new StandardResponse()
      {
        Result = StandardResponseCode.InternalError,
        Success = false
      };
    }

    public static StandardResponse ForSuccess()
    {
      return new StandardResponse()
      {
        Result = StandardResponseCode.Success,
        Success = true,
      };
    }

    public IActionResult JsonResult()
    {
      return new JsonResult(this)
      {
        StatusCode = Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest,
      };
    }
  }

  public class StandardResponse<T> : StandardResponse
  {
    public T Data { get; set; }
  }
}