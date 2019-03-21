using Merlin.Core.Data.DataContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Data.Services
{
    public class EmailService
    {
        private readonly MerlinWriteContext writeContext;
        private readonly ISequenceGenerator sequenceGenerator;

        public EmailService(MerlinWriteContext writeContext, ISequenceGenerator sequenceGenerator)
        {
            this.writeContext = writeContext;
            this.sequenceGenerator = sequenceGenerator;
        }

        /// <summary>
        /// This method will assign a sequence number and add the alerts to the tracking context but will not commit changes to the DB so that it can be used in another transaction
        /// </summary>
        /// <param name="alerts"></param>
        /// <returns></returns>
        public async Task DispatchAlerts(IEnumerable<EmailQueue> alerts)
        {
            await Task.WhenAll(alerts
                .Select(async alert => alert.IdEmail = (int)await sequenceGenerator.GetNextAsync(SequenceType.EmailQueue)));

            await writeContext.EmailQueue.AddRangeAsync(alerts);
        }
    }
}
