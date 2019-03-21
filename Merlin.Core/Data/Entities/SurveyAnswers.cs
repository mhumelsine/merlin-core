using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyAnswers : IAuditAdded, IAuditChanged
    {
        public int IdAnswer { get; set; }
        public int? IdSurveyInstance { get; set; }
        public string IdQuestion { get; set; }
        public int? IdQuestionSub { get; set; }
        public string DsAnswer { get; set; }
        public string CdValue { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? IdCase { get; set; }
        public string NmShort { get; set; }

        public SurveyEntity SurveyEntity { get; set; }
    }
}
