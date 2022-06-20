using MediatR;

namespace Application.Todos.Messages.Commands
{
    public class SetAsDoneCommand
        : ICommand<string>
    {
        public string Id { get; set; }
    }
}
