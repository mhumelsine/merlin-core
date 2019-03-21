using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PrintLog
    {
        public int IdPrint { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string DsLink { get; set; }
        public string CdIcd9 { get; set; }
        public int? IdCase { get; set; }
    }
}
