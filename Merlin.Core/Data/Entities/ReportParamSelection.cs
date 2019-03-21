using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ReportParamSelection
    {
        public string IdUser { get; set; }
        public string NmReport { get; set; }
        public string NmField { get; set; }
        public string DsFieldValue { get; set; }
        public DateTime? DtAdded { get; set; }
    }
}
