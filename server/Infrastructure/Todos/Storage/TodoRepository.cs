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

        public async Task<IEnumerable<Todo>> GetAllAsync(int skip = 0, int take = 0, string filter="")
        {
            var query = GetAll();
            if (!string.IsNullOrWhiteSpace(filter))
                query = query.Where(e => e.Type.ToLower() == filter.ToLower());
            
            query = query.Skip(skip).Take(take);

            return await query.ToListAsync();
        }

        public async Task<int> CountAsync(string filter = "")
        {
            var query = GetAll();

            if (!string.IsNullOrWhiteSpace(filter))
                query = query.Where(e => e.Type.ToLower() == filter.ToLower());

            return await query.CountAsync();
        }
    }
}