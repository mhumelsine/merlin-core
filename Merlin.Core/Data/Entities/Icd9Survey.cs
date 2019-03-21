using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Icd9Survey
    {
        public int IdSequence { get; set; }
        public string CdType { get; set; }
        public string CdIcd9 { get; set; }
        public int? IdOrder { get; set; }
        public string DsQuestion { get; set; }
        public string DsPromptType { get; set; }
        public string DsPrompt { get; set; }
        public string DsScriptName { get; set; }
        public DateTime? DtEffective { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InActive { get; set; }
        public string DsHeader { get; set; }
        public DateTime? DtExpired { get; set; }
        public string DsMatchValues { get; set; }
        public string DsActivateQuestions { get; set; }
        public string DsShort { get; set; }
        public string InIncludeQi { get; set; }
        public int? IdLevel { get; set; }
        public string InDisplay { get; set; }
    }
}
