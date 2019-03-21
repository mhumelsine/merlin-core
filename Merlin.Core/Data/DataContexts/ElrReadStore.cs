using Isf.Core.Data;
using Isf.Core.Utils.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data.DataContexts
{
    public class ElrReadStore : DapperReadStore
    {
        public ElrReadStore(ILogger logger, IConnectionFactory connectionFactory) : base(logger, connectionFactory)
        {
        }
    }
}
