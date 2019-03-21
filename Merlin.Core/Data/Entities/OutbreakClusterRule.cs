using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakClusterRule
    {
        public string CdOutbreakCluster { get; set; }
        public string CdCounty { get; set; }
        public short? AmNoOfCases { get; set; }
        public short? AmPeriodDays { get; set; }
    }
}
