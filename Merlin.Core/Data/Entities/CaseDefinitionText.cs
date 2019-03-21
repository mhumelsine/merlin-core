using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseDefinitionText
    {
        public string CdIcd9 { get; set; }
        public string DsCaseDefText { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
