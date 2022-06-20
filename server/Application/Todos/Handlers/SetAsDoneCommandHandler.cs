using Application.Todos.Messages.Commands;
using Domain.Repositories;
using static Domain.Enums.Enums;

namespace Application.Todos.Handlers
{
    public class SetAsDoneCommandHandler
        : ICommandHandler<SetAsDoneCommand, string>
    {
        private readonly ITodoRepository _todoRepository;

        public SetAsDoneCommandHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<string> Handle(SetAsDoneCommand request, CancellationToken cancellationToken)
        {
            var todo = await _todoRepository.FindByIdAsync(request.Id);
            todo.Status = Status.Done.ToString();

            await _todoRepository.UpdateAsync(todo);

            return request.Id;
        }
    }
}
