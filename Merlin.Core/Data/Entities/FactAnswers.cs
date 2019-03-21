using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class FactAnswers
    {
        public int IdAnswer { get; set; }
        public int? IdQuestionSub { get; set; }
        public int? IdProfile { get; set; }
        public int? IdCase { get; set; }
        public int? IdQuestion { get; set; }
        public string DsAnswer { get; set; }
        public string CdValue { get; set; }
        public DateTime? DtAdded { get; set; }
        public DateTime? DtUpdated { get; set; }

        public DimQuestion IdQuestionNavigation { get; set; }
    }
}
