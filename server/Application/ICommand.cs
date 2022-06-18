using MediatR;

namespace Application
{
    public interface ICommand<TResponse> : IRequest<TResponse>
    { 
    }
}
