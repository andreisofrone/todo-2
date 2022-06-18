using Application.Todos.Messages.Queries;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[EnableCors("AnyPolicy")]
[Route("api/todos")]
public class TodosController : ControllerBase
{
    private readonly IMediator _mediator;

    public TodosController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
            => Ok(await _mediator.Send(new GetAllTodosQuery()));
}