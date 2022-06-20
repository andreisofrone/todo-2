using FluentValidation;
using MediatR;
using Todo.Middlewares;

namespace Todo.Pipeline
{
    public class ValidationBehavior<TRequest, TResponse>
         : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {

        public ValidationBehavior(IValidator<TRequest> validator)
        {
            Validator = validator ?? throw new ArgumentNullException(nameof(validator));
        }

        protected IValidator<TRequest> Validator { get; }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var result = Validator.Validate(request);

            if (!result.IsValid)
                throw new DataValidationException(result.Errors);

            return await next();
        }
    }
}
