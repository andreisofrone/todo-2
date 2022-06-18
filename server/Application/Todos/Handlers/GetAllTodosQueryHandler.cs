using Application.Todos.Messages.Queries;
using Domain.Models;
using Domain.Repositories;
using MediatR;

namespace Application.Todos.Handlers
{
    public class GetAllTodosQueryHandler
            : IRequestHandler<GetAllTodosQuery, IEnumerable<Todo>>
    {

        private readonly ITodoRepository _todoRepository;

        public GetAllTodosQueryHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<IEnumerable<Todo>> Handle(GetAllTodosQuery request, CancellationToken cancellationToken)
        {
            var items = await _todoRepository.GetAllAsync();

            return items;
        }
    }
}
