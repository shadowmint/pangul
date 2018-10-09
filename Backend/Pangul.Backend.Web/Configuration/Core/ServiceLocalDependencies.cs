using System;
using System.Collections.Generic;
using FluentValidation;
using Pangul.Services;

namespace Pangul.Backend.Web.Configuration.Core
{
    public class ServiceLocalDependencies
    {
        private void RegisterValidatorsByConvention(PangulServiceConventions.IClassLocator classLocator, PangulServiceConventions.IContainerBuilder builder)
        {
            foreach (var type in classLocator.FindTypesImplementing<IValidator>())
            {
                builder.RegisterAsImplementedInterfaces(type);
            }
        }

        /// <summary>
        /// These are stateless services that are fabricated on request.
        /// </summary>
        public void RegisterAll(PangulServiceConventions.IClassLocator classLocator, PangulServiceConventions.IContainerBuilder builder)
        {
            RegisterValidatorsByConvention(classLocator, builder);
        }
    }
}