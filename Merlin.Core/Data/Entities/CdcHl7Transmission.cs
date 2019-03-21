using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CdcHl7Transmission
    {
        public int IdKey { get; set; }
        public int? IdCase { get; set; }
        public string CdHl7Flag { get; set; }
        public string DsHl7Message { get; set; }
        public DateTime? DtPicked { get; set; }
        public DateTime? DtAdded { get; set; }
        public int? IdHl7 { get; set; }
    }
}
