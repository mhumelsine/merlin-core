using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LabTestIcd9
    {
        public LabTestIcd9()
        {
            LabTestIcd9Set = new HashSet<LabTestIcd9Set>();
        }

        public int IdLabTestSet { get; set; }
        public string CdIcd9 { get; set; }
        public DateTime DtEffective { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public Icd9 CdIcd9Navigation { get; set; }
        public ICollection<LabTestIcd9Set> LabTestIcd9Set { get; set; }
    }
}
