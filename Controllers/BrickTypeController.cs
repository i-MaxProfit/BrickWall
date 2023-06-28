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

        public BrickTypeController(IBrickTypeService brickTypeService)
        {
            _brickTypeService = brickTypeService;
        }

        [HttpGet]
        public async Task<IEnumerable<BrickTypeDTO>> Get()
        {
            var brickTypes = await _brickTypeService.GetListAsync(useAsNoTracking: true);
            return brickTypes;
        }
    }
}
