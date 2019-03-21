using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakLab
    {
        public int IdOutbreak { get; set; }
        public int IdLabTest { get; set; }
        public string DsLabTest { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public int? IdOrder { get; set; }
    }
}
