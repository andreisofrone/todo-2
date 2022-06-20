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
                => await GetAll().AsNoTracking().ToListAsync();

        public async Task<IEnumerable<Todo>> GetAllAsync(int skip = 0, int take = 0, string filter="", string fastSearch = "")
        {
            var query = GetAll();

            if (!string.IsNullOrWhiteSpace(filter))
                query = query.Where(e => e.Type.ToLower() == filter.ToLower());

            //not fast at all but we can see some results for this demo
            //to get faster results we have to integrate ElasticSearch and to query the service to get the results
            if (!string.IsNullOrWhiteSpace(fastSearch))
                query = AddFastSearchExpression(query, fastSearch.ToLower());

            query = query.Skip(skip).Take(take).AsNoTracking();

            return await query.ToListAsync();
        }

        public async Task<int> CountAsync(string filter = "", string fastSearch = "")
        {
            var query = GetAll();

            if (!string.IsNullOrWhiteSpace(filter))
                query = query.Where(e => e.Type.ToLower() == filter.ToLower());

            //not fast at all but we can see some results for this demo
            //to get faster results we have to integrate ElasticSearch and to query the service to get the results
            if (!string.IsNullOrWhiteSpace(fastSearch))
                query = AddFastSearchExpression(query, fastSearch.ToLower());

            return await query.AsNoTracking().CountAsync();
        }

        private IQueryable<Todo> AddFastSearchExpression(IQueryable<Todo> query, string fastSearch)
        {
            return query.Where(e => e.Type.ToLower().Contains(fastSearch) ||
                                         e.Content.ToLower().Contains(fastSearch) ||
                                         e.Title.ToLower().Contains(fastSearch) ||
                                         e.Status.ToLower().Contains(fastSearch));
        }
    }
}