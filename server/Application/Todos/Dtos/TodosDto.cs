namespace Application.Todos.Dtos
{
    public class TodosDto
    {
        public int Count { get; set; }

        public IEnumerable<TodoDto> Items { get; set; }
    }
}
