using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakLabTmp
    {
        public int IdSerial { get; set; }
        public string IdSession { get; set; }
        public string IdUser { get; set; }
        public string DsLabTest { get; set; }
        public int? IdOrder { get; set; }
    }
}
