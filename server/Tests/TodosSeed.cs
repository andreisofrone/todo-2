using Domain.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Tests
{
    public static class TodosSeed
    {
        public static IEnumerable<Todo> GetTestData()
        {
            yield return new Todo()
            {
                Id = "bdff234c-33d3-447f-80ee-84e43a33f01d",
                Title = "MegaMillions awaiting Draw Result",
                Content = "draw 12345 awaiting draw result",
                CreationTime = 1542111235544,
                DueDate = 1622374526379,
                Status = "Active",
                Type = "Results"
            };
        }
    }
}
