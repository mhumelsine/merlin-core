using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class DeployArea
    {
        public DeployArea()
        {
            DeployAreaSurvey = new HashSet<DeployAreaSurvey>();
            DeployLocation = new HashSet<DeployLocation>();
            Deployment = new HashSet<Deployment>();
        }

        public int IdArea { get; set; }
        public string NmArea { get; set; }
        public DateTime DtStart { get; set; }
        public DateTime? DtEnd { get; set; }
        public int? IdOutbreak { get; set; }
        public string CdAreaStatus { get; set; }
        public string DsGroundzero { get; set; }
        public string DsAreaGeocoding { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public Outbreak IdOutbreakNavigation { get; set; }
        public ICollection<DeployAreaSurvey> DeployAreaSurvey { get; set; }
        public ICollection<DeployLocation> DeployLocation { get; set; }
        public ICollection<Deployment> Deployment { get; set; }
    }
}
