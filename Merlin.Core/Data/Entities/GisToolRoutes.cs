using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class GisToolRoutes
    {
        public int IdGisToolRoute { get; set; }
        public string NmRoute { get; set; }
        public string DsOszmalName { get; set; }
        public string DsNotes { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public bool? InPickedUp { get; set; }
    }
}
