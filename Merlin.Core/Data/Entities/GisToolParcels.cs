using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class GisToolParcels
    {
        public GisToolParcels()
        {
            DeployLocation = new HashSet<DeployLocation>();
        }

        public int IdArea { get; set; }
        public int IdGisToolParcel { get; set; }
        public string NmParcel { get; set; }
        public string IdParcel { get; set; }
        public DateTime? DtEvent { get; set; }
        public int? IdRoute { get; set; }
        public int? IdParcelSeq { get; set; }
        public string DsPhyAddr1 { get; set; }
        public string DsPhyAddr2 { get; set; }
        public string CdAddressStatus { get; set; }
        public string DsAddNewAddress { get; set; }
        public string CdSurveyStatus { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsCity { get; set; }
        public string DsZip { get; set; }
        public string CdParcelType { get; set; }
        public int? AmNumOfUnits { get; set; }
        public int? AmNumOfBuildings { get; set; }
        public string CdParcelStatus { get; set; }

        public ICollection<DeployLocation> DeployLocation { get; set; }
    }
}
