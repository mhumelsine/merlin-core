using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AmrDrug
    {
        public int IdDrug { get; set; }
        public string CdClass { get; set; }
        public string DsName { get; set; }
        public string DsMatch { get; set; }
        public int IdKey { get; set; }
        public DateTime? DtAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }
        public string IdAdded { get; set; }
    }
}
