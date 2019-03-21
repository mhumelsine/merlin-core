using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Merlin.Core.Data.DataContexts;

namespace Merlin.Core.Outbreak.Services
{
    public class OutbreakRepository 
    {
        private readonly MerlinReadContext readContext;
        private readonly MerlinReadStore readStore;

        public OutbreakRepository(MerlinReadStore readStore, MerlinReadContext readContext) 
        {
            this.readStore = readStore;
            this.readContext = readContext;
        }

        public async Task<string> GetEventDescription(int outbreakId, string eventType, string subType = null) {
            var eventId = await readContext.OutbreakEvents
                    .Where(e => e.IdOutbreak == outbreakId)
                    .Where(e => e.CdEventType == eventType)
                    .Where(e => subType == null || e.CdSubType == subType)
                    .OrderByDescending(x => x.IdEvent)
                    .Select(x => x.IdEvent) 
                    .FirstOrDefaultAsync();

            var description = await readContext.OutbreakEvents
                    .Where(e => e.IdEvent == eventId)
                    .OrderBy(x => x.IdSequence)
                    .Select(x => x.DsDesc)
                    .ToListAsync();


            return string.Join("",description);
        }

        public async Task<IEnumerable<string>> GetEventSubTypes(int outbreakId, string eventType)
        {
            var types = await readContext.OutbreakEvents
                    .Where(e => e.IdOutbreak == outbreakId)
                    .Where(e => e.CdEventType == eventType)
                    .Select(x => x.CdSubType)
                    .Distinct()
                    .ToListAsync();

            return types;
        }
    }
        
}
