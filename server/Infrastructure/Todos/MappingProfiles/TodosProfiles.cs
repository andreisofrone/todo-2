using Application.Todos.Dtos;
using AutoMapper;
using Domain.Models;

namespace Infrastructure.Todos.MappingProfiles
{
    public class TodosProfiles
        : Profile
    {
        public TodosProfiles()
        {
            CreateMap<Todo, TodoDto>();
        }
    }
}
