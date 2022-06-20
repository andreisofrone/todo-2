using MediatR;

namespace Application
{
    public interface IQuery<out TResponse> : IRequest<TResponse>
    {
    }
}
