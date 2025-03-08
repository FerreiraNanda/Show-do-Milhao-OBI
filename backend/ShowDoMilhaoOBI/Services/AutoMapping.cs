using AutoMapper;
using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Services
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<User, RegisterDTO>().ReverseMap();
            CreateMap<User, EditAccountDTO>().ReverseMap();
            CreateMap<Game, GameDTO>().ReverseMap();
            CreateMap<Question, QuestionDTO>().ReverseMap();
        }
    }
}
