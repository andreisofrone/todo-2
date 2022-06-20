using Domain.Models;
using Domain.Repositories;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Todos.Storage
{
    public class TodoRepository
     : Repository<Todo>, ITodoRepository
    {
        public TodoRepository(AppDbContext context)
             : base(context)
        {         
        }

        public async Task<IEnumerable<Todo>> GetAllAsync()
                => await GetAll().ToListAsync();

        public async Task<IEnumerable<Todo>> GetAllAsync(int skip, int take)
                => await GetAll().Skip(skip).Take(take).ToListAsync();

        public async Task<int> CountAsync()
                => await GetAll().CountAsync();
    }
}