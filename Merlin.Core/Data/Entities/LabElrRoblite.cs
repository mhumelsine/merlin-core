using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LabElrRoblite
    {
        public int IdElrObservation { get; set; }
        public bool? InPicked { get; set; }
        public DateTime? DtAdded { get; set; }
        public int? IdElrOrder { get; set; }
        public int? IdElrRequest { get; set; }
    }
}
