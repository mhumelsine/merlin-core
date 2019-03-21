using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Family
    {
        public Family()
        {
            Assignment = new HashSet<Assignment>();
            ObservationCatalog = new HashSet<ObservationCatalog>();
        }

        public int Id { get; set; }
        public int IdParentObservation { get; set; }
        public string CdGrouping { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public ICollection<Assignment> Assignment { get; set; }
        public ICollection<ObservationCatalog> ObservationCatalog { get; set; }
    }
}
