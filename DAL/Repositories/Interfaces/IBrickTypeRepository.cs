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
    public interface IBrickTypeRepository
    {
        Task<List<BrickType>> GetListAsync(
            Expression<Func<BrickType, bool>> filter = null,
            Func<IQueryable<BrickType>, IIncludableQueryable<BrickType, object>> include = null,
            Func<IQueryable<BrickType>, IOrderedQueryable<BrickType>> orderBy = null,
            bool useAsNoTracking = false);
    }
}
