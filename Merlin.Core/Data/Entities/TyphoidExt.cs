using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class TyphoidExt
    {
        public int IdCase { get; set; }
        public string CdCitizenship { get; set; }
        public string DsCitizenship { get; set; }
        public string CdAntibioticTesting { get; set; }
        public string CdAmpicillan { get; set; }
        public string CdChloramphenicol { get; set; }
        public string CdTrimethoprim { get; set; }
        public string CdFluoroquinolones { get; set; }
        public int? AmDaysHospitalized { get; set; }
        public string CdTyphoidVaccination { get; set; }
        public DateTime? DtUsReturn { get; set; }
        public string CdTravelBusiness { get; set; }
        public string CdTravelTourism { get; set; }
        public string CdTravelVisiting { get; set; }
        public string CdTravelImmigration { get; set; }
        public string CdTravelOther { get; set; }
        public string DsTravelOther { get; set; }
        public string CdCaseTraced { get; set; }
        public string CdPreviouslyKnown { get; set; }
        public string DsComments { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsPfge { get; set; }
    }
}
