using DAL.Entities.DTO;
using DAL.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IBrickOptionRepository
    {
        Task<BrickOption> GetFirstAsync(
            Expression<Func<BrickOption, bool>> filter = null,
            Func<IQueryable<BrickOption>, IIncludableQueryable<BrickOption, object>> include = null,
            Func<IQueryable<BrickOption>, IOrderedQueryable<BrickOption>> orderBy = null,
            bool useAsNoTracking = false);
    }
}
