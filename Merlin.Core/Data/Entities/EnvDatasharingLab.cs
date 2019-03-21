using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EnvDatasharingLab
    {
        public int IdLab { get; set; }
        public int? IdCase { get; set; }
        public DateTime? DtCollected { get; set; }
        public DateTime? DtReported { get; set; }
        public string DsLabNotes { get; set; }
        public string CdSpecimen { get; set; }
        public string DsLabAddress { get; set; }
        public string DsLabName { get; set; }

        public EnvDatasharingCase IdCaseNavigation { get; set; }
    }
}
