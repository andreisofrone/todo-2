using Infrastructure.Context;
using Infrastructure.Todos.Storage;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Tests
{
    public class Test
    {
        [Fact]
        public async void Count_Db_Items()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                       .UseInMemoryDatabase(databaseName: "Todos")
                       .Options;
            var databaseContext = new AppDbContext(options);
            var data = TodosSeed.GetTestData();

            await databaseContext.AddRangeAsync(data);
            databaseContext.SaveChanges();

            var todoRep = new TodoRepository(databaseContext);
            var result = await todoRep.CountAsync();

            Assert.Equal(1, result);
        }
    }
}