using Merlin.Core.Data.DataContexts;

namespace Merlin.Core.SmartGoals.Services
{
    public class SmartGoalsRepository
    {
        private readonly MerlinReadStore readStore;

        public SmartGoalsRepository(MerlinReadStore readStore)
        {
            this.readStore = readStore;
        }       
    }
}
