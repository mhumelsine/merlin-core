using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HepatitisAExt
    {
        public int IdCase { get; set; }
        public string InDaycare { get; set; }
        public string InHouseContact { get; set; }
        public string InCcFacility { get; set; }
        public string InSuspectedSource { get; set; }
        public string InFoodhandler { get; set; }
        public string InNotFoodhandler { get; set; }
        public string DsFoodItem { get; set; }
        public string InWaterborne { get; set; }
        public string InNotIdentified { get; set; }
        public string InEmpFoodhandler { get; set; }
        public string InContactHepA { get; set; }
        public string CdContactType { get; set; }
        public string DsOtherContactType { get; set; }
        public string InEpiLink { get; set; }
        public string InPatientTravelA { get; set; }
        public string InFamilyTravelA { get; set; }
        public string DsFamilyTravel1 { get; set; }
        public string DsFamilyTravel2 { get; set; }
        public string DsFamilyTravel3 { get; set; }
        public string CdMalePartners { get; set; }
        public string CdFemalePartners { get; set; }
        public string InInjectDrugs { get; set; }
        public string InUseDrugs { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsPatientTravel1 { get; set; }
        public string CdReasonTravel { get; set; }
        public string DsReasonTravelOther { get; set; }
    }
}
