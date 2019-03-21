using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Icd9CrfEvent
    {
        public int IdEvent { get; set; }
        public string CdIcd9 { get; set; }
        public int? IdSequence { get; set; }
        public string NmEvent { get; set; }
        public string DsComments { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
