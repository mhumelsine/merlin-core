using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AuditDetail
    {
        public AuditDetail()
        {
            AuditChange = new HashSet<AuditChange>();
        }

        public long Id { get; set; }
        public long IdAudit { get; set; }
        public int IdEntity { get; set; }
        public string CdType { get; set; }

        public Audit IdAuditNavigation { get; set; }
        public ICollection<AuditChange> AuditChange { get; set; }
    }
}
