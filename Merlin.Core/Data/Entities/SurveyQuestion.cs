using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyQuestion
    {
        public SurveyQuestion()
        {
            QuestionValidation = new HashSet<QuestionValidation>();
            SurveyQuestionValidation = new HashSet<SurveyQuestionValidation>();
        }

        public int IdQuestion { get; set; }
        public string DsQuestion { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdUpdated { get; set; }
        public DateTime? DtUpdated { get; set; }
        public DateTime? DtExpired { get; set; }
        public string CdQuestionType { get; set; }
        public string DsChoices { get; set; }
        public int? IdSurvey { get; set; }
        public DateTime? DtEffective { get; set; }
        public int? IdOrder { get; set; }
        public int? AmSize { get; set; }
        public string DsAction { get; set; }
        public string DsHeader { get; set; }
        public string DsActivatedFrom { get; set; }
        public string DsMatchValues { get; set; }
        public string NmShort { get; set; }
        public string DsValidation { get; set; }
        public string DsQuestionLabel { get; set; }
        public string InRequired { get; set; }
        public int? AmX { get; set; }
        public int? AmY { get; set; }
        public int? AmWidth { get; set; }
        public int? AmHeight { get; set; }
        public int? IdQuestionGroup { get; set; }
        public int? IdContainer { get; set; }
        public string DsDefaultValue { get; set; }
        public string DsAdmin { get; set; }
        public string DsAttributes { get; set; }
        public string DsExtTable { get; set; }
        public string DsExtColumn { get; set; }
        public string DsExtFormatIn { get; set; }
        public string DsExtFormatOut { get; set; }
        public string CdEntityType { get; set; }
        public string DsEntity { get; set; }
        public string DsSqlSelect { get; set; }
        public string DsSqlUpdate { get; set; }
        public string CdDisplayType { get; set; }
        public string DsEnabled { get; set; }

        public ICollection<QuestionValidation> QuestionValidation { get; set; }
        public ICollection<SurveyQuestionValidation> SurveyQuestionValidation { get; set; }
    }
}
