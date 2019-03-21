using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseHistory
    {
        public int IdCase { get; set; }
        public string CdStatus { get; set; }
        public string CdExtdStatus { get; set; }
        public string DsReason { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdAdded { get; set; }
        public string CdCounty { get; set; }
        public string CdDxStatus { get; set; }
        public int IdHistory { get; set; }
        public string CdReason { get; set; }
        public string CdIcd9 { get; set; }
        public short? AmAge { get; set; }
        public string CdLevel { get; set; }
        public string CdJurisdiction { get; set; }
        public string CdCountyAssigned { get; set; }
        public DateTime? DtAssignedAsOf { get; set; }
        public string DsDxStatusRule { get; set; }
    }
}
