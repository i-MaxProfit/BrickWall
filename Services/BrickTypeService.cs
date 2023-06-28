using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Query;
using Services.Interfaces;
using System.Linq.Expressions;

namespace Services
{
    public class BrickTypeService : IBrickTypeService
    {
        private readonly IBrickTypeRepository _brickTypeRepository;
        private readonly IMapper _mapper;

        public BrickTypeService(IBrickTypeRepository brickTypeRepository, IMapper mapper) 
        {
            _brickTypeRepository = brickTypeRepository;
            _mapper = mapper;
        }

        public async Task<List<BrickTypeDTO>> GetListAsync(
            Expression<Func<BrickType, bool>> filter = null,
            Func<IQueryable<BrickType>, IIncludableQueryable<BrickType, object>> include = null,
            Func<IQueryable<BrickType>, IOrderedQueryable<BrickType>> orderBy = null,
            bool useAsNoTracking = false)
        {
            var items = await _brickTypeRepository.GetListAsync(filter, include, orderBy, useAsNoTracking);
            return _mapper.Map<List<BrickTypeDTO>>(items);
        }
    }
}
