using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public abstract class BaseRepository<TType, TContext>
        where TType : BaseEntity, new()
        where TContext : ApplicationDbContext
    {
        protected TContext dbContext;
        private readonly DbSet<TType> _dbSet;

        protected BaseRepository(TContext context)
        {
            dbContext = context;
            _dbSet = context.Set<TType>();
        }

        public virtual async Task<TType> GetFirstAsync(
            Expression<Func<TType, bool>> filter = null,
            Func<IQueryable<TType>, IIncludableQueryable<TType, object>> include = null,
            Func<IQueryable<TType>, IOrderedQueryable<TType>> orderBy = null,
            bool useAsNoTracking = false)
        {
            var query = GetQuery(filter, include);

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (useAsNoTracking)
            {
                query = query.AsNoTracking();
            }

            return await query.FirstOrDefaultAsync();
        }

        public virtual async Task<List<TType>> GetListAsync(
            Expression<Func<TType, bool>> filter = null,
            Func<IQueryable<TType>, IIncludableQueryable<TType, object>> include = null,
            Func<IQueryable<TType>, IOrderedQueryable<TType>> orderBy = null,
            bool useAsNoTracking = false)
        {
            var query = GetQuery(filter, include);

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (useAsNoTracking)
            {
                query = query.AsNoTracking();
            }

            return await query.ToListAsync();
        }

        private IQueryable<TType> GetQuery(
            Expression<Func<TType, bool>> filter,
            Func<IQueryable<TType>, IIncludableQueryable<TType, object>> include,
            bool useAsNoTracking = false)
        {
            IQueryable<TType> query = _dbSet;

            if (useAsNoTracking)
            {
                query = query.AsNoTracking();
            }

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (include != null)
            {
                query = include(query);
            }

            return query;
        }
    }
}
