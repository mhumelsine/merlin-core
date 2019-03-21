using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrFilterDetail
    {
        public int IdEvent { get; set; }
        public int IdStep { get; set; }
        public string CdTargetColumn { get; set; }
        public string CdOperand { get; set; }
        public string DsTargetValue { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InAlpha { get; set; }
        public int IdFilterDetailKey { get; set; }

        public ElrFilterEvent IdEventNavigation { get; set; }
    }
}
