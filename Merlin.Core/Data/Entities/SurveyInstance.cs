using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyInstance : IAuditAdded, IAuditChanged 
    {
        public SurveyInstance()
        {
            DeployLocation = new HashSet<DeployLocation>();
        }

        public int IdSurveyInstance { get; set; }
        public int? IdSurvey { get; set; }
        public int? IdProfile { get; set; }
        public string CdEntityType { get; set; }
        public int? IdEntity { get; set; }
        public string NmSurveyInstance { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public ICollection<DeployLocation> DeployLocation { get; set; }
    }
}
