using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class BacterialExtCommon
    {
        public int IdCase { get; set; }
        public string InHospital { get; set; }
        public string InResident { get; set; }
        public string DsFirstPositive { get; set; }
        public string DsFetusOutcome { get; set; }
        public string DsAge { get; set; }
        public string DsBirthweight { get; set; }
        public string DsInfectionCaused { get; set; }
        public string DsOrganismOther { get; set; }
        public string DsSterileSites { get; set; }
        public string DsSsIsolatedOther { get; set; }
        public DateTime? DtFirstPostCult { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsOtherSterile { get; set; }
        public string DsFacilityName { get; set; }
        public string DsPfge { get; set; }
        public string DsPfgeSecondary { get; set; }
        public string DsCdcClusterCode { get; set; }
        public string DsWgsClusterCode { get; set; }
    }
}
