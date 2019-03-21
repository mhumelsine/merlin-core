using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LeadExtAdditional
    {
        public int? IdCase { get; set; }
        public int IdAdditional { get; set; }
        public string CdAdditionalPatientOccupation { get; set; }
        public string CdAdditionalPatientEmployer { get; set; }
        public string DsOtherAdditionalPatientOccupation { get; set; }
        public string DsOtherAdditionalPatientEmployer { get; set; }
        public int? IdLab { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }

        public Resource IdLabNavigation { get; set; }
    }
}
