using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SymptomIcd9
    {
        public int IdSymptomIcd9Set { get; set; }
        public int IdSymptomSet { get; set; }
        public string CdSymptom { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public short IdPriority { get; set; }
        public string InPrimary { get; set; }

        public SymptomSet IdSymptomSetNavigation { get; set; }
    }
}
