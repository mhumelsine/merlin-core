using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakSearchFields
    {
        public int IdField { get; set; }
        public string NmColumn { get; set; }
        public string DsDescription { get; set; }
        public string DsPromptType { get; set; }
        public string DsSelect { get; set; }
        public string DsOperators { get; set; }
        public int? IdSequence { get; set; }
    }
}
