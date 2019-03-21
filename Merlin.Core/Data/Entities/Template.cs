using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Template
    {
        public int IdTemplate { get; set; }
        public string DsTemplate { get; set; }
        public string CdIcd9 { get; set; }
        public string CdCounty { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdUpdated { get; set; }
        public DateTime? DtUpdated { get; set; }
        public DateTime? DtExpired { get; set; }
    }
}
