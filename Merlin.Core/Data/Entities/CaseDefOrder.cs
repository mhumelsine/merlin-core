using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseDefOrder
    {
        public int IdCaseDefOrder { get; set; }
        public int? IdCaseDef { get; set; }
        public short IdPaintSequence { get; set; }
        public int? IdCaseDefItem { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsInterpret { get; set; }
        public short? AmInterpret { get; set; }
        public string CdInterpret { get; set; }
        public string DsLengthOfDays { get; set; }
        public short? AmInterpretTo { get; set; }
        public string InStateOnly { get; set; }

        public CaseDef IdCaseDefNavigation { get; set; }
    }
}
