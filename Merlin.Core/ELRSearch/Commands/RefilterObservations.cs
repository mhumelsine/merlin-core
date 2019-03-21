using System.Collections.Generic;

namespace Merlin.Core.ELRSearch.Commands
{
    public class RefilterObservations
    {

        [MustContainAtLeastOneItem]
        public IEnumerable<int> ObservationKeys { get; set; }
    }
}
