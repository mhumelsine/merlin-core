using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseTaskList
    {
        public int IdCase { get; set; }
        public int? CdCounty { get; set; }
        public string CdIcd9 { get; set; }
        public string CdInvestigator { get; set; }
        public DateTime? DtReminder { get; set; }
        public bool? InInterview { get; set; }
        public bool? InMissingLab { get; set; }
        public bool? InMissingElements { get; set; }
        public bool? InAutoCreated { get; set; }
        public bool? InNonFlorida { get; set; }
        public bool? InQiCandidate { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
