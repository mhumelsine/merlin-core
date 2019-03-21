using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EnvDatasharingCaseSymptoms
    {
        public int IdCase { get; set; }
        public string CdSymptoms { get; set; }
        public string NmSymptoms { get; set; }

        public EnvDatasharingCase IdCaseNavigation { get; set; }
    }
}
