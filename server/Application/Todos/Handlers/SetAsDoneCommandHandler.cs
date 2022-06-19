using Application.Todos.Messages.Commands;
using Domain.Repositories;
using MediatR;
using static Domain.Enums.Enums;

namespace Application.Todos.Handlers
{
    public class SetAsDoneCommandHandler
          : AsyncRequestHandler<SetAsDoneCommand>
    {
        private readonly ITodoRepository _todoRepository;

        public SetAsDoneCommandHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        protected override async Task Handle(SetAsDoneCommand request, CancellationToken cancellationToken)
        {
            var todo = await _todoRepository.FindByIdAsync(request.Id);
            todo.Status = Status.Done.ToString();

            await _todoRepository.UpdateAsync(todo);
        }
    }
}
