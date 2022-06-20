using Domain.Models;

namespace Domain.Repositories
{
    public interface ITodoRepository
    : IRepository<Todo>
    {
        Task<IEnumerable<Todo>> GetAllAsync();

        Task<IEnumerable<Todo>> GetAllAsync(int skip, int take);

        Task<int> CountAsync();
    }
}
