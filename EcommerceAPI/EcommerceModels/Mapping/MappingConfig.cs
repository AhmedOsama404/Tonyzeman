using AutoMapper;
using EcommerceModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceModels.Mapping
{
    public class MappingConfig:Profile
    {
        public MappingConfig()
        {
            CreateMap<ApplicationUser, RegisterDTO>().ReverseMap();
            CreateMap<ApplicationUser, LoginDTO>().ReverseMap();
        }
    }
}
