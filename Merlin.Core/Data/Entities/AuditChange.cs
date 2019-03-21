using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AuditChange
    {
        public long IdAudit { get; set; }
        public long IdAuditDetail { get; set; }
        public long Id { get; set; }
        public string DsAttribute { get; set; }
        public string DsOldValue { get; set; }
        public string DsNewValue { get; set; }

        public AuditDetail IdAuditNavigation { get; set; }
    }
}
