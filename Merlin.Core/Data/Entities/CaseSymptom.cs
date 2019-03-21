using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseSymptom
    {
        public int IdCase { get; set; }
        public string CdSymptom { get; set; }
        public DateTime? DtOnset { get; set; }
        public string DsSymptomOther { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string AmOnsetTime { get; set; }

        public Symptom CdSymptomNavigation { get; set; }
    }
}
