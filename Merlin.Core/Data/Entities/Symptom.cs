using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Symptom
    {
        public Symptom()
        {
            CaseSymptom = new HashSet<CaseSymptom>();
            Icd9Symptom = new HashSet<Icd9Symptom>();
        }

        public string CdSymptom { get; set; }
        public string NmSymptom { get; set; }
        public string IdChanged { get; set; }
        public DateTime DtChanged { get; set; }
        public string CdSeverity { get; set; }

        public ICollection<CaseSymptom> CaseSymptom { get; set; }
        public ICollection<Icd9Symptom> Icd9Symptom { get; set; }
    }
}
