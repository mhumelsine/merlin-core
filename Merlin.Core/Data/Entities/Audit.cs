using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Audit
    {
        public Audit()
        {
            AuditDetail = new HashSet<AuditDetail>();
        }

        public long Id { get; set; }
        public string CdType { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public ICollection<AuditDetail> AuditDetail { get; set; }
    }
}
