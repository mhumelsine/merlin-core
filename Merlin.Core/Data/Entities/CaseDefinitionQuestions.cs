using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseDefinitionQuestions
    {
        public int IdSequence { get; set; }
        public string CdType { get; set; }
        public string CdIcd9 { get; set; }
        public int? IdOrder { get; set; }
        public string DsQuestion { get; set; }
        public string DsPromptType { get; set; }
        public string DsPrompt { get; set; }
        public string DsScriptName { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? IdCaseDef { get; set; }
    }
}
