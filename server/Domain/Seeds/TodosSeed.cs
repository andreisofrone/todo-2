using Domain.Models;
using Newtonsoft.Json;

namespace Domain.Seeds
{
    public static class TodosSeed
    {
        public static IEnumerable<Todo> GetTestData()
        {
            using (StreamReader r = new StreamReader("../Domain/Seeds/data.json"))
            {
                string json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Todo>>(json);
            }
        }
    }
}
