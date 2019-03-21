using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyQuestionValidation
    {
        public int IdSurvey { get; set; }
        public int IdQuestion { get; set; }
        public string NmShort { get; set; }
        public int IdValidation { get; set; }
        public string DsAltErrorMsg { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public SurveyQuestion IdQuestionNavigation { get; set; }
        public Survey IdSurveyNavigation { get; set; }
        public SurveyValidation IdValidationNavigation { get; set; }
    }
}
