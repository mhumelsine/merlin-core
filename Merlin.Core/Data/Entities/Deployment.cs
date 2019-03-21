using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Deployment
    {
        public Deployment()
        {
            DeployVisit = new HashSet<DeployVisit>();
        }

        public int IdDeployment { get; set; }
        public int IdArea { get; set; }
        public DateTime DtDeployment { get; set; }
        public string CdDeploymentStatus { get; set; }
        public string NmDeployment { get; set; }
        public string IdUserField { get; set; }
        public string DsContact { get; set; }
        public Guid DsToken { get; set; }
        public string DsComments { get; set; }
        public string JsOutgoing { get; set; }
        public string JsIncoming { get; set; }
        public DateTime? DtCheckout { get; set; }
        public DateTime? DtCheckin { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public DeployArea IdAreaNavigation { get; set; }
        public ICollection<DeployVisit> DeployVisit { get; set; }
    }
}
