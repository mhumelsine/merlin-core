using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseSupplemental
    {
        public int IdCase { get; set; }
        public string CdSupplementalType { get; set; }
        public string DsSupplemental { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
    }
}
