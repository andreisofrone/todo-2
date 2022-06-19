namespace Domain.Repositories
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();

        Task<T> FindByIdAsync(string id);

        Task AddAsync(T entity);

        Task UpdateAsync(T entity);

        Task Delete(T entity);
    }
}