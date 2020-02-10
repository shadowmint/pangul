using System;
using System.Collections.Generic;
using Pangul.Services.Actions;

namespace Pangul.Services
{
    public class PangulServiceConventions
    {
        public void RegisterCommandHandlersByConvention(IClassLocator classLocator, IContainerBuilder builder)
        {
            foreach (var type in classLocator.FindTypesImplementing<ICommandHandler>())
            {
                builder.RegisterAsImplementedInterfaces(type);
            }
        }

        public void RegisterQueryHandlersByConvention(IClassLocator classLocator, IContainerBuilder builder)
        {
            foreach (var type in classLocator.FindTypesImplementing<IQueryHandler>())
            {
                builder.RegisterAsImplementedInterfaces(type);
            }
        }

        public void RegisterServicesByConvention(IClassLocator classLocator, IContainerBuilder builder)
        {
            foreach (var type in classLocator.FindTypesImplementing<IService>())
            {
                builder.RegisterAsImplementedInterfaces(type);
            }
            
            foreach (var type in classLocator.FindTypesImplementing<IStatefulService>())
            {
                builder.RegisterSingletonAsImplementedInterfaces(type);
            }
        }

        /// <summary>
        /// These are stateless services that are fabricated on request.
        /// </summary>
        public void RegisterAll(IClassLocator classLocator, IContainerBuilder builder)
        {
            RegisterCommandHandlersByConvention(classLocator, builder);
            RegisterQueryHandlersByConvention(classLocator, builder);
            RegisterServicesByConvention(classLocator, builder);
        }

        public interface IClassLocator
        {
            IEnumerable<Type> FindTypesImplementing<T>();
        }

        public interface IContainerBuilder
        {
            void RegisterAsImplementedInterfaces(Type type);
            void RegisterSingletonAsImplementedInterfaces(Type type);
        }
    }
}