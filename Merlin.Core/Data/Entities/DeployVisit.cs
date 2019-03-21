using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class DeployVisit
    {
        public int IdDeployment { get; set; }
        public int IdArea { get; set; }
        public int IdLocation { get; set; }
        public int IdSequence { get; set; }
        public bool? InMaster { get; set; }
        public string CdVisitStatus { get; set; }
        public DateTime? DtVisit { get; set; }
        public DateTime? DtVisitDeparture { get; set; }
        public DateTime? DtRevisit { get; set; }
        public DateTime? DtRevisitDeparture { get; set; }
        public string CdOutcome { get; set; }
        public DateTime? DtOutcome { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public DeployLocation Id { get; set; }
        public Deployment IdDeploymentNavigation { get; set; }
    }
}
