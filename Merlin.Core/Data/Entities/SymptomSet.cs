using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SymptomSet
    {
        public SymptomSet()
        {
            SymptomIcd9 = new HashSet<SymptomIcd9>();
        }

        public int IdSymptomSet { get; set; }
        public string CdIcd9 { get; set; }
        public DateTime DtEffective { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public Icd9 CdIcd9Navigation { get; set; }
        public ICollection<SymptomIcd9> SymptomIcd9 { get; set; }
    }
}
