using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Treatment
    {
        public int IdCase { get; set; }
        public string CdTreatment { get; set; }
        public string DsTreatment { get; set; }
        public string DsDose { get; set; }
        public int? InDuration { get; set; }
        public string CdUnit { get; set; }
        public DateTime? DtBegin { get; set; }
        public DateTime? DtEnd { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
