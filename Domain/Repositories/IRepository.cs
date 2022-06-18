namespace Domain.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<IQueryable<T>> GetAll();

        Task<T> FindByIdAsync(long id);

        Task AddAsync(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}