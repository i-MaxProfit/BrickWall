using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BrickOption, BrickOptionDTO>().ReverseMap();
            CreateMap<BrickType, BrickTypeDTO>().ReverseMap();
        }
    }
}
