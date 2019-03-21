using Isf.Core.Cqrs;
using Merlin.Core.Data.Services;
using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Survey : IHaveUID, IAuditAdded, IAuditChanged
    {
        public Survey()
        {
            DeployAreaSurvey = new HashSet<DeployAreaSurvey>();
            SurveyQuestionValidation = new HashSet<SurveyQuestionValidation>();
        }

        public Guid UID { get; set; }

        public int IdSurvey { get; set; }
        public string CdSurveyType { get; set; }
        public string DsEntity { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string NmSurvey { get; set; }
        public string CdLevel { get; set; }
        public DateTime? DtEffective { get; set; }
        public bool? InSimpleSurvey { get; set; }
        public bool? InClosedYearEdit { get; set; }
        public int? IdOutbreak { get; set; }
        public string CdIcd9 { get; set; }
        public Guid? UidLayout { get; set; }
        public ICollection<DeployAreaSurvey> DeployAreaSurvey { get; set; }
        public ICollection<SurveyQuestionValidation> SurveyQuestionValidation { get; set; }
        public int? IdSurveyVersion { get; set; }
    }
}
