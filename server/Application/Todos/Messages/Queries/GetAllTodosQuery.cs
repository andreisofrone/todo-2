using Domain.Models;

namespace Application.Todos.Messages.Queries
{
    public class GetAllTodosQuery
        : IQuery<IEnumerable<Todo>>
    {
    }
}
