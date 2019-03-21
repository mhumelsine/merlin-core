using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyValidation
    {
        public SurveyValidation()
        {
            SurveyQuestionValidation = new HashSet<SurveyQuestionValidation>();
        }

        public int IdValidation { get; set; }
        public string NmValidation { get; set; }
        public string DsTargetType { get; set; }
        public string DsDefaultErrorMsg { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public ICollection<SurveyQuestionValidation> SurveyQuestionValidation { get; set; }
    }
}
