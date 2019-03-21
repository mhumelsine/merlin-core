using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class RiskFactor
    {
        public string CdType { get; set; }
        public string DsDropDownDisplay { get; set; }
        public string DsHeader { get; set; }
        public string DsTblName { get; set; }
        public string DsFldName { get; set; }
        public string DsDatabaseValue { get; set; }
        public string DsDisplayValue { get; set; }
        public string DsFontSize { get; set; }
        public int? DsOrder { get; set; }
        public bool? InRiskFactorReport { get; set; }
        public int InKey { get; set; }
        public bool? InCustomLilelist { get; set; }
        public bool? InMultipleAnswers { get; set; }
        public bool? InExportable { get; set; }
    }
}
