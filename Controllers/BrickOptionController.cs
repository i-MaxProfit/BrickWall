using AutoMapper;
using DAL.Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;

namespace BrickWall.Controllers
{
    [Route("[controller]")]
    public class BrickOptionController : Controller
    {
        private readonly IBrickOptionService _brickOptionService;

        public BrickOptionController(IBrickOptionService brickOptionService)
        {
            _brickOptionService = brickOptionService;
        }

        [HttpGet]
        public async Task<BrickOptionDTO> Get(int brickTypeId)
        {
            var brickOption = await _brickOptionService.GetFirstAsync(
                filter: f => f.BrickTypeId == brickTypeId,
                include: i => i.Include(ii => ii.BrickType),
                useAsNoTracking: true);

            return brickOption;
        }
    }
}
