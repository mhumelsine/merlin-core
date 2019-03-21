using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrFilterOutcome
    {
        public int IdEvent { get; set; }
        public string CdUpdateColumn { get; set; }
        public string DsUpdateValue { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int IdFilterOutcomeKey { get; set; }

        public ElrFilterEvent IdEventNavigation { get; set; }
    }
}
