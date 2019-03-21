using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseDefItem
    {
        public int IdCaseDefItem { get; set; }
        public string DsItemText { get; set; }
        public string CdControlType { get; set; }
        public string DsTargetControl { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public CaseDefItem IdCaseDefItemNavigation { get; set; }
        public CaseDefItem InverseIdCaseDefItemNavigation { get; set; }
    }
}
