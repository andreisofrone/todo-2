using Application.Todos.Messages.Commands;
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
    public async Task<IActionResult> GetAsync([FromQuery] GetAllTodosQuery query)
            => Ok(await _mediator.Send(query));

    [HttpPatch]
    [Route("set-as-done/{Id}")]
    public async Task<IActionResult> SetAsDone([FromRoute] SetAsDoneCommand command)
    {
        await _mediator.Send(command);
        return Accepted(command);
    }
}