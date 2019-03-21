using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseAntibioticList
    {
        public int IdCaseAntibiotic { get; set; }
        public int IdCase { get; set; }
        public string DsAntibiotic { get; set; }
        public DateTime? DtBegin { get; set; }
        public DateTime? DtEnd { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
