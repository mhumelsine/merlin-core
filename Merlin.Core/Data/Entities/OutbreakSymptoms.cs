using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakSymptoms
    {
        public int IdOutbreak { get; set; }
        public string CdSymptoms { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string DsOther { get; set; }

        public Outbreak Outbreak { get; set; }
    }
}
