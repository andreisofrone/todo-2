﻿using Application.Todos.Dtos;
using Domain.Models;

namespace Application.Todos.Messages.Queries
{
    public class GetAllTodosQuery
        : IQuery<TodosDto>
    {
        public int Skip { get; set; }

        public int Take { get; set; }
    }
}
