using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseDefOutcome
    {
        public int? IdCaseDef { get; set; }
        public byte IdPriority { get; set; }
        public string CdOutcomeDxStatus { get; set; }
        public string DsAnswerSet { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public short? AmSymptom { get; set; }
        public int IdOutcome { get; set; }

        public CaseDef IdCaseDefNavigation { get; set; }
    }
}
