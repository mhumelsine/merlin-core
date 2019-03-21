using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseDef
    {
        public CaseDef()
        {
            CaseDefOrder = new HashSet<CaseDefOrder>();
            CaseDefOutcome = new HashSet<CaseDefOutcome>();
        }

        public int IdCaseDef { get; set; }
        public string CdIcd9 { get; set; }
        public DateTime DtEffective { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsNotes { get; set; }
        public bool? InSmart { get; set; }

        public ICollection<CaseDefOrder> CaseDefOrder { get; set; }
        public ICollection<CaseDefOutcome> CaseDefOutcome { get; set; }
    }
}
