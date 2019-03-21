using Isf.Core.Data;
using Isf.Core.Utils.Logging;

namespace Merlin.Core.Data.DataContexts
{
    public class MerlinReadStore : DapperReadStore
    {
        public MerlinReadStore(ILogger logger, IConnectionFactory connectionFactory) : base(logger, connectionFactory)
        {
        }
    }
}
