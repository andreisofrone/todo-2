using Application.Todos.Dtos;
using Application.Todos.Messages.Queries;
using AutoMapper;
using Domain.Models;
using Domain.Repositories;
using MediatR;

namespace Application.Todos.Handlers
{
    public class GetAllTodosQueryHandler
            : IRequestHandler<GetAllTodosQuery, TodosDto>
    {

        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;

        public GetAllTodosQueryHandler(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
        }

        public async Task<TodosDto> Handle(GetAllTodosQuery request, CancellationToken cancellationToken)
        {
            var result = new TodosDto();
            var items = await _todoRepository.GetAllAsync(request.Skip, request.Take);
            var count = await _todoRepository.CountAsync();
            result.Items = _mapper.Map<IEnumerable<TodoDto>>(items);
            result.Count = count;

            return result;
        }
    }
}
