using MediatR;

namespace Application
{
    public interface IQuery<TResponse> : IRequest<TResponse>
    {
    }
}
