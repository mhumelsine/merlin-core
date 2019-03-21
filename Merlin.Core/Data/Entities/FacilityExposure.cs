using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class FacilityExposure
    {
        public int IdFacilityExposure { get; set; }
        public int IdCase { get; set; }
        public string CdFacility { get; set; }
        public string DsFacilityOther { get; set; }
        public string CdExposure { get; set; }
        public string NmFacility { get; set; }
        public string InTransplant { get; set; }
        public string DsVisitReason { get; set; }
        public string DsFacilityCity { get; set; }
        public string CdState { get; set; }
        public DateTime? DtStart { get; set; }
        public DateTime? DtEnd { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
