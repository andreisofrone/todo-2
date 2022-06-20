using Application.Todos.Messages.Queries;
using FluentValidation;

namespace Application.Todos.Validation
{
    public sealed class GetAllTodosQueryValidator
        : AbstractValidator<GetAllTodosQuery>
    {
        public GetAllTodosQueryValidator()
        {
            RuleFor(cp => cp.Skip)
                .GreaterThanOrEqualTo(0).WithMessage(c => $"{nameof(c.Skip)} should greater than or equal to 0.");

            RuleFor(cp => cp.Take)
               .GreaterThan(0).WithMessage(c => $"{nameof(c.Take)} should greater than 0.");
        }
    }
}
