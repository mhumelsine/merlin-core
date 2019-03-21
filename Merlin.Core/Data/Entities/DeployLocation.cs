using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class DeployLocation
    {
        public DeployLocation()
        {
            DeployPerson = new HashSet<DeployPerson>();
            DeployTag = new HashSet<DeployTag>();
            DeployVisit = new HashSet<DeployVisit>();
        }

        public int IdArea { get; set; }
        public int IdLocation { get; set; }
        public int? IdGisToolParcel { get; set; }
        public string DsTracking { get; set; }
        public string CdLocationType { get; set; }
        public string CdLocationStatus { get; set; }
        public string NmLocation { get; set; }
        public string DsAddress1 { get; set; }
        public string DsAddress2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public decimal? AmLongitude { get; set; }
        public decimal? AmLatitude { get; set; }
        public int? IdSurveyInstance { get; set; }
        public string CdClosure { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdParcelType { get; set; }
        public int? AmNumOfUnits { get; set; }
        public int? AmNumOfBuildings { get; set; }
        public string CdOutcome { get; set; }
        public string DsReturn { get; set; }

        public GisToolParcels Id { get; set; }
        public DeployArea IdAreaNavigation { get; set; }
        public SurveyInstance IdSurveyInstanceNavigation { get; set; }
        public ICollection<DeployPerson> DeployPerson { get; set; }
        public ICollection<DeployTag> DeployTag { get; set; }
        public ICollection<DeployVisit> DeployVisit { get; set; }
    }
}
