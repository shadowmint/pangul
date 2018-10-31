using System;
using System.IO;
using System.IO.Abstractions;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using NCore.Base.Commands.Conventions;
using NCore.Base.Log;
using NLog;
using Pangul.Backend.Web.Configuration.Authentication;
using Pangul.Backend.Web.Configuration.Authentication.Infrastructure;
using Pangul.Services;
using Pangul.Services.Concrete;
using Pangul.Services.Services;
using Pangul.Services.Services.Auth;
using IContainer = Autofac.IContainer;

namespace Pangul.Backend.Web.Configuration.Core
{
  public class ServiceApplication
  {
    private const string ServiceMatchExpression = "Pangul\\.Core\\..*";

    private IContainer _container;

    public IServiceProvider ConfigureServices(IServiceCollection services)
    {
      // Configure logging
      new LogService().ConfigureLogging(new ServiceLogging());
      services.AddSingleton<ILoggerFactory>((_) => new ServiceLoggerFactory());

      // Register assemblies for discovery
      ConcreteServices.RegisterAssemblyForDiscovery();

      // Load services by convention
      var builder = new ContainerBuilder();
      var config = new ServiceDependencies(builder);
      new PangulServiceConventions().RegisterAll(config, config);
      new ServiceLocalDependencies().RegisterAll(config, config);
      new ServiceLocator(ServiceMatchExpression).RegisterAllByConvention(builder);

      // 3rd-party
      builder.RegisterType<FileSystem>().AsImplementedInterfaces();

      // Load asp.net core services
      services.AddRouting();
      services.AddMvc().AddFluentValidation();
      new ServiceExtensions()
        .AddCors(services)
        .AddGlobalExceptionHandler(services);

      // Configure web auth
      var authService = new ServicePolicyList().Build(services);
      services.AddSingleton(authService);

      // Convert to autofac
      builder.Populate(services);
      _container = builder.Build();

      // Configure pangul auth
      var authBuilder = _container.Resolve<IPangulAuthServiceBuilder>();
      var userService = _container.Resolve<IUserService>();
      authBuilder.ConfigureProvider(new ServiceIdentityList(userService));
      authBuilder.Build(_container.Resolve<IPangulAuthService>());

      // Bind autofac as service provider
      return new AutofacServiceProvider(_container);
    }

    public void ConfigureApplication(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseAuthentication();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
          name: "default",
          template: "{controller=Frontend}/{action=Index}/{id?}");
      });
      
      app.UseCors(ServiceExtensions.PangulCorsPolicy);

      app.UseStaticFiles(new StaticFileOptions
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
        RequestPath = ""
      });

      app.UseWhen(
        context => !context.Request.Path.StartsWithSegments("/api"),
        appBuilder => appBuilder.UseStaticFiles());

      var logger = LogManager.GetCurrentClassLogger();
      logger.Info("Application started");
    }
  }
}