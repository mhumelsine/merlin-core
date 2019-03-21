using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LabTestIcd9Set
    {
        public int IdLabTestIcd9Set { get; set; }
        public int IdLabTestSet { get; set; }
        public string CdLabTest { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public short IdPriority { get; set; }

        public LabTestIcd9 IdLabTestSetNavigation { get; set; }
    }
}
