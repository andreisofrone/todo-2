using Domain.Models;
using Domain.Repositories;
using MediatR;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Tests
{
    public class TodosTest
    {
        public Mock<IMediator> mockMediator = new Mock<IMediator>();
        public Mock<ITodoRepository> mockTodoRepository = new Mock<ITodoRepository>();

        [Fact]
        public void GetTodos()
        {
            var mockedTodos = new List<Todo>();

            mockTodoRepository.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(mockedTodos.AsEnumerable()));
        }
    }
}