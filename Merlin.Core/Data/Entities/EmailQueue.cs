using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EmailQueue : IAuditAdded
    {
        public int IdEmail { get; set; }
        public string IdUserRecipient { get; set; }
        public string CdAlert { get; set; }
        public string CdEntity { get; set; }
        public string IdEntity { get; set; }
        public string CdProcessed { get; set; }
        public DateTime? DtProcessed { get; set; }
        public int? IdEmailHistory { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string DsComments { get; set; }
        public string CdCounty { get; set; }
    }
}
