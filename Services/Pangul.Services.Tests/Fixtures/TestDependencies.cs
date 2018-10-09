using System;
using System.Collections.Generic;
using Autofac;
using NCore.Base.Commands.Conventions;

namespace Pangul.Services.Tests.Fixtures
{
  public class TestDependencies : PangulServiceConventions.IClassLocator, PangulServiceConventions.IContainerBuilder
  {
    private readonly ClassLocator _finder;
    private readonly ContainerBuilder _builder;

    public TestDependencies(ContainerBuilder builder)
    {
      _builder = builder;
      _finder = new ClassLocator("Pangul\\..*");
    }

    public IEnumerable<Type> FindTypesImplementing<T>()
    {
      return _finder.Implements<T>();
    }

    public void RegisterAsImplementedInterfaces(Type type)
    {
      _builder.RegisterType(type).AsImplementedInterfaces().InstancePerDependency();
    }

    public void RegisterSingletonAsImplementedInterfaces(Type type)
    {
      _builder.RegisterType(type).AsImplementedInterfaces().SingleInstance();
    }
  }
}