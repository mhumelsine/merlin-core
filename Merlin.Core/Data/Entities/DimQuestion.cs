using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class DimQuestion
    {
        public DimQuestion()
        {
            FactAnswers = new HashSet<FactAnswers>();
        }

        public int IdQuestion { get; set; }
        public string DsQuestion { get; set; }
        public DateTime? DtExpired { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdUpdated { get; set; }
        public DateTime? DtUpdated { get; set; }
        public string CdQuestionType { get; set; }
        public string DsChoices { get; set; }
        public string NmSurvey { get; set; }
        public DateTime? DtEffective { get; set; }
        public string CdEntityType { get; set; }
        public string DsEntity { get; set; }
        public string CdSurveyType { get; set; }
        public string CdLevel { get; set; }

        public ICollection<FactAnswers> FactAnswers { get; set; }
    }
}
