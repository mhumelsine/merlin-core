using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class VaersPrevEvent
    {
        public int IdCase { get; set; }
        public string CdRelation { get; set; }
        public string InAdverseEvent { get; set; }
        public string DsAdverseEvent { get; set; }
        public short? AmOnsetAge { get; set; }
        public string DsVaccineType { get; set; }
        public short? AmDoseCount { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
