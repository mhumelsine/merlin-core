using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrFluFilterRules
    {
        public string CdLabProvider { get; set; }
        public string CdAltObservation { get; set; }
        public string DsFluKeyword { get; set; }
        public string CdFluHeader { get; set; }
        public string CdMerlinTestCode { get; set; }
        public string CdTestResult { get; set; }
        public string CdResultType { get; set; }
        public string CdNumericResultOperand { get; set; }
        public string DsNumericResult { get; set; }
        public string DsNumericSeparator { get; set; }
        public string DsNumericSuffix { get; set; }
        public bool? InMumpsData { get; set; }
        public bool? InOnlyFluResults { get; set; }
        public bool? InKeywords { get; set; }
        public string DsResultKeyword { get; set; }
        public string DsNumericResult2 { get; set; }
        public string DsSnomedPhlip { get; set; }
        public int IdKey { get; set; }
        public string CdLoinc { get; set; }
    }
}
