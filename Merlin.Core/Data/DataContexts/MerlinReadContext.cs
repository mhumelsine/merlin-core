using Isf.Core.Utils;
using Microsoft.EntityFrameworkCore;

namespace Merlin.Core.Data.DataContexts
{
    public class MerlinReadContext : MerlinWriteContext
    {
        public MerlinReadContext(DbContextOptions<MerlinWriteContext> options, IUsernameProvider userNameProvider, IProcessNameProvider processNameProvider)
            :base(options, userNameProvider, processNameProvider)
        {
            ChangeTracker.AutoDetectChangesEnabled = false;
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public MerlinReadContext()
        {
            ChangeTracker.AutoDetectChangesEnabled = false;
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
    }
}
