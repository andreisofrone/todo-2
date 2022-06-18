using Domain.Repositories;

namespace Infrastructure.Context
{
    public abstract class Repository<T>
       : IRepository<T> where T : class
    {
        protected readonly AppDbContext context;

        public Repository(AppDbContext context)
        {
            this.context = context;
        }

        public virtual IQueryable<T> GetAll()
        {
            return context.Set<T>();
        }

        public virtual async Task<T> FindByIdAsync(long id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public virtual async Task AddAsync(T entity)
        {
            await context.Set<T>().AddAsync(entity);
        }

        public virtual void Update(T entity)
        {
            context.Set<T>().Update(entity);
        }

        public virtual void Delete(T entity)
        {
            context.Set<T>().Remove(entity);
        }
    }
}