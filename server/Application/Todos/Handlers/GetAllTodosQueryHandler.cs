using Application.Todos.Dtos;
using Application.Todos.Messages.Queries;
using AutoMapper;
using Domain.Repositories;

namespace Application.Todos.Handlers
{
    public class GetAllTodosQueryHandler
            : IQueryHandler<GetAllTodosQuery, TodosDto>
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
            //check for null and validate
            var result = new TodosDto();
            var items = await _todoRepository.GetAllAsync(request.Skip, request.Take, request.Filter);
            var count = await _todoRepository.CountAsync(request.Filter);
            result.Items = _mapper.Map<IEnumerable<TodoDto>>(items);
            result.Count = count;

            return result;
        }
    }
}
