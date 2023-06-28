using DAL.Entities;
using DAL.Entities.DTO;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IBrickTypeService
    {
        Task<List<BrickTypeDTO>> GetListAsync(
            Expression<Func<BrickType, bool>> filter = null,
            Func<IQueryable<BrickType>, IIncludableQueryable<BrickType, object>> include = null,
            Func<IQueryable<BrickType>, IOrderedQueryable<BrickType>> orderBy = null,
            bool useAsNoTracking = false);
    }
}
