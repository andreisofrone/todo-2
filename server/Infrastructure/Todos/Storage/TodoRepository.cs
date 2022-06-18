using Domain.Models;
using Domain.Repositories;
using Infrastructure.Context;

namespace Infrastructure.Todos.Storage
{
    public class TodoRepository
     : Repository<Todo>, ITodoRepository
    {
        public TodoRepository(AppDbContext context)
             : base(context)
        {
        }
    }
}