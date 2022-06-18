using Domain.Models;

namespace Domain.Repositories
{
    public interface ITodoRepository
    : IRepository<Todo>
    {
        Task<IEnumerable<Todo>> GetAllAsync();
    }
}
