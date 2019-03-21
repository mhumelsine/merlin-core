using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrFilterEvent
    {
        public ElrFilterEvent()
        {
            ElrFilterDetail = new HashSet<ElrFilterDetail>();
            ElrFilterOutcome = new HashSet<ElrFilterOutcome>();
        }

        public int IdEvent { get; set; }
        public string CdLabProvider { get; set; }
        public string CdAltObservation { get; set; }
        public string CdLoinc { get; set; }
        public int? IdSequence { get; set; }
        public string NmEvent { get; set; }
        public string DsComments { get; set; }
        public DateTime? DtExpire { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public ICollection<ElrFilterDetail> ElrFilterDetail { get; set; }
        public ICollection<ElrFilterOutcome> ElrFilterOutcome { get; set; }
    }
}
