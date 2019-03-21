using Isf.Core.Utils;
using Microsoft.EntityFrameworkCore;

namespace Merlin.Core.Data.DataContexts
{
    public class ELRReadContext : ELRWriteContext
    {
        public ELRReadContext(DbContextOptions<ELRWriteContext> options)
            : base(options)
        {
            ChangeTracker.AutoDetectChangesEnabled = false;
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public ELRReadContext()
        {
            ChangeTracker.AutoDetectChangesEnabled = false;
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
    }
}