using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Icd9Notes
    {
        public int IdNote { get; set; }
        public int IdOrder { get; set; }
        public string CdIcd9 { get; set; }
        public string DsNotes { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
    }
}
