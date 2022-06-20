using FluentValidation;
using MediatR;
using System.Reflection;

namespace Todo.Pipeline
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddFluentValidation(this IServiceCollection services, IEnumerable<Assembly> assemblies, ServiceLifetime lifetime = ServiceLifetime.Transient)
        {
            services.Add(new ServiceDescriptor(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>), lifetime));

            services.AddValidatorsFromAssemblies(assemblies, lifetime);

            return services;
        }
    }
}
