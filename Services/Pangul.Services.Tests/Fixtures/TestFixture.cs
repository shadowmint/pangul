using System;
using System.IO.Abstractions.TestingHelpers;
using System.Threading;
using Autofac;
using NCore.Base.Commands.Conventions;
using Pangul.Services.Services;
using Pangul.Services.Services.Auth;
using Pangul.Services.Tests.Helpers;

namespace Pangul.Services.Tests.Fixtures
{
  public class TestFixture : IDisposable
  {
    private static readonly Mutex Lock = new Mutex();

    private const string ServiceMatchExpression = "Pangul\\.Core\\..*";

    private UserHelper _userHelper;

    public UserHelper UserHelper => _userHelper ?? (_userHelper = new UserHelper(this));

    private QuestionHelper _questionHelper;

    public QuestionHelper QuestionHelper => _questionHelper ?? (_questionHelper = new QuestionHelper(this));
    
    private AnswerHelper _answerHelper;

    public AnswerHelper AnswerHelper => _answerHelper ?? (_answerHelper = new AnswerHelper(this));

    private TopicHelper _topicHelper;

    public TopicHelper TopicHelper => _topicHelper ?? (_topicHelper = new TopicHelper(this));

    
    public IContainer Container { get; }

    public TestFixture()
    {
      Lock.WaitOne();

      // Drop any existing connection
      TestDbContext.Drop();

      // Register assemblies for discovery
      Concrete.ConcreteServices.RegisterAssemblyForDiscovery();

      // Load services by convention
      var builder = new ContainerBuilder();
      var config = new TestDependencies(builder);
      new PangulServiceConventions().RegisterAll(config, config);
      new ServiceLocator(ServiceMatchExpression).RegisterAllByConvention(builder);
      
      // 3rd-party dependencies
      builder.RegisterType<MockFileSystem>().AsImplementedInterfaces().SingleInstance();

      // Build container
      Container = builder.Build();

      // Configure pangul auth
      var authBuilder = Container.Resolve<IPangulAuthServiceBuilder>();
      var userService = Container.Resolve<IUserService>();
      authBuilder.ConfigureProvider(new TestAuthentication(userService));
      authBuilder.Build(Container.Resolve<IPangulAuthService>());
    }

    public void Dispose()
    {
      Container.Dispose();
      Lock.ReleaseMutex();
    }
  }
}