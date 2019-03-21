using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AmrGroups
    {
        public int IdPanel { get; set; }
        public int IdDrug { get; set; }
        public string CdGroup { get; set; }
        public int IdKey { get; set; }
        public DateTime? DtAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }
        public string IdAdded { get; set; }
    }
}
