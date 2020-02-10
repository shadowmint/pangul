using System;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Pangul.Backend.Web.Configuration.Settings;
using Pangul.Backend.Web.Infrastructure;

namespace Pangul.Backend.Web.Core
{
  public class ServiceExtensions
  {
    public const string PangulCorsPolicy = "Pangul";

    public ServiceExtensions AddCors(IServiceCollection services)
    {
      services.AddCors(options => { options.AddPolicy(PangulCorsPolicy, corsOptions => Configure(corsOptions, services)); });
      return this;
    }

    public ServiceExtensions AddGlobalExceptionHandler(IServiceCollection services)
    {
      services.Configure<MvcOptions>(opt => { opt.Filters.Add<GlobalExceptionFilter>(); });
      return this;
    }

    public void Configure(CorsPolicyBuilder options, IServiceCollection services)
    {
      var settings = new ServiceSettings().Auth;
      options.WithOrigins(settings.ValidAuthReferrers);
      options.WithHeaders("X-Requested-With", "Content-Type");
      options.WithMethods("POST");
      options.AllowCredentials();
    }
  }
}