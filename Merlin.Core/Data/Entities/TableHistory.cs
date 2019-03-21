using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class TableHistory
    {
        public int IdHistory { get; set; }
        public string CdEntityType { get; set; }
        public int? IdEntity { get; set; }
        public string NmColumn { get; set; }
        public string DsValue { get; set; }
        public DateTime? DtDropped { get; set; }
    }
}
