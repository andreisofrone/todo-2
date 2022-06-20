using Application.Todos.Messages.Commands;
using FluentValidation;

namespace Application.Todos.Validation
{
    public sealed class SetAsDoneCommandValidator
         : AbstractValidator<SetAsDoneCommand>
    {
        public SetAsDoneCommandValidator()
        {
            RuleFor(cp => cp.Id)
                .Must(ValidateGuid).WithMessage(c => $"{nameof(c.Id)} must be a Guid.");
        }

        private bool ValidateGuid(string key)
        {
            return Guid.TryParse(key, out var result);
        }
    }
}
