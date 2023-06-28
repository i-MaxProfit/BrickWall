using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Query;
using Services.Interfaces;
using System.Linq.Expressions;

namespace Services
{
    public class BrickOptionService : IBrickOptionService
    {
        private readonly IBrickOptionRepository _brickOptionRepository;
        private readonly IMapper _mapper;

        public BrickOptionService(IBrickOptionRepository brickOptionRepository, IMapper mapper)
        {
            _brickOptionRepository = brickOptionRepository;
            _mapper = mapper;
        }

        public async Task<BrickOptionDTO> GetFirstAsync(
            Expression<Func<BrickOption, bool>> filter = null,
            Func<IQueryable<BrickOption>, IIncludableQueryable<BrickOption, object>> include = null,
            Func<IQueryable<BrickOption>, IOrderedQueryable<BrickOption>> orderBy = null,
            bool useAsNoTracking = false)
        {
            var item = await _brickOptionRepository.GetFirstAsync(filter, include, orderBy, useAsNoTracking);
            return _mapper.Map<BrickOptionDTO>(item);
        }
    }
}
