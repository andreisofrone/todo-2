namespace Application.Todos.Messages.Commands
{
    public class SetAsDoneCommand
        : ICommand
    {
        public string Id { get; set; }
    }
}
