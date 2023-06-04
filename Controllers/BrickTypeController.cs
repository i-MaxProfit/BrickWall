using AutoMapper;
using DAL.Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace BrickWall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrickTypeController : ControllerBase
    {
        private readonly IBrickTypeService _brickTypeService;
        private readonly IMapper _mapper;

        public BrickTypeController(IBrickTypeService brickTypeService, IMapper mapper)
        {
            _brickTypeService = brickTypeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<BrickTypeDTO>> Get()
        {
            var brickTypes = await _brickTypeService.GetListAsync(useAsNoTracking: true);
            return _mapper.Map<IEnumerable<BrickTypeDTO>>(brickTypes);
        }
    }
}
