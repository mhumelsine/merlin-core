using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyNotes
    {
        public int IdNote { get; set; }
        public int IdOrder { get; set; }
        public int? IdSurveyInstance { get; set; }
        public int? IdQuestion { get; set; }
        public int? IdQuestionSub { get; set; }
        public string DsNotes { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdUpdated { get; set; }
        public DateTime? DtUpdated { get; set; }
    }
}
