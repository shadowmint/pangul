using System.Threading.Tasks;
using Pangul.Core.Data;

namespace Pangul.Services.Actions
{
    public interface IQueryHandler
    {
    }

    public interface IQueryHandler<in TQuery, TData> : IQueryHandler where TQuery : IQuery<TData>
    {
        Task<TData> Execute(PangulDbContext context, TQuery query);
    }
}