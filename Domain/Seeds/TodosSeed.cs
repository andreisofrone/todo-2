using Domain.Models;
using Newtonsoft.Json;

namespace Domain.Seeds
{
    public static class TodosSeed
    {
        private static IEnumerable<Todo> GetTestData()
        {
            var todos = new List<Todo>();
            using (StreamReader r = new StreamReader("./data.json"))
            {
                string json = r.ReadToEnd();
                todos = JsonConvert.DeserializeObject<List<Todo>>(json);
            }

            return todos;
        }
    }
}
