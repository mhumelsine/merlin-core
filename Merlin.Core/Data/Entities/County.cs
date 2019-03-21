using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class County
    {
        public int CdCounty { get; set; }
        public string NmName { get; set; }
        public short? CdRegion { get; set; }
        public string CdSize { get; set; }
        public string CdTimezone { get; set; }
        public string DsComments { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdHalRegion { get; set; }
    }
}
