using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
    public class ElrOutcome : IAuditAdded
    {
        public int IdElrObservation { get; set; }
        public string CdAction { get; set; }
        public string CdAssignmentType { get; set; }
        public string DsAssignmentReason { get; set; }
        public int? IdProfile { get; set; }
        public string IdStateno { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string CdCounty { get; set; }
    }
}
