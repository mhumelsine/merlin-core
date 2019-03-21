using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ShigellaExt
    {
        public int IdCase { get; set; }
        public string InContactsDiarrhea { get; set; }
        public string InContactsDiarrheaHousehold { get; set; }
        public string InContactsDiarrhea24hAfter { get; set; }
        public string InContactsDiarrheaWithin24h { get; set; }
        public string InContactsDiarrhea24hBefore { get; set; }
        public string InContactsDiarrheaUnk { get; set; }
        public string InTravel { get; set; }
        public string InTravelOvernight { get; set; }
        public string InTravelInState { get; set; }
        public string InTravelOutState { get; set; }
        public string InTravelOutCountry { get; set; }
        public string InFoodRestaurant { get; set; }
        public string DsFoodRestaurant { get; set; }
        public string InGroupMeal { get; set; }
        public string DsGroupMeal { get; set; }
        public string InRecreationalWater { get; set; }
        public string DsRecreationalWater { get; set; }
        public string InRecreationalWaterPool { get; set; }
        public string InRecreationalWaterSpa { get; set; }
        public string InRecreationalWaterRiver { get; set; }
        public string InRecreationalWaterOther { get; set; }
        public string InRecreationalWaterKidPool { get; set; }
        public string InRecreationalWaterFountain { get; set; }
        public string InRecreationalWaterBoating { get; set; }
        public string InRecreationalWaterWadPool { get; set; }
        public string InRecreationalWaterPark { get; set; }
        public string InRecreationalWaterOcean { get; set; }
        public string DsRecreationalWaterOther { get; set; }
        public string InDrinkUntreatedWater { get; set; }
        public string DsDrinkUntreatedWater { get; set; }
        public string InDrinkUntreatedWaterPrivate { get; set; }
        public string InDrinkUntreatedWaterOther { get; set; }
        public string InDrinkUntreatedWaterShared { get; set; }
        public string DsDrinkUntreatedWaterOther { get; set; }
        public string InContactHealthcare { get; set; }
        public string DsContactHealthcare { get; set; }
        public string InContactDiapered { get; set; }
        public string DsContactDiapered { get; set; }
        public string InLiveInstitution { get; set; }
        public string DsLiveInstitution { get; set; }
        public string InExposureExcreta { get; set; }
        public string DsExposureExcreta { get; set; }
        public string InSexualContact { get; set; }
        public string DsSexualContact { get; set; }
        public string InPrepareFoodSymptomatic { get; set; }
        public string DsPrepareFoodSymptomatic { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InDaycare { get; set; }
        public string DsDaycare { get; set; }
        public string InPreschool { get; set; }
        public string DsPreschool { get; set; }
        public string InElementaryschool { get; set; }
        public string DsElementaryschool { get; set; }
        public string InCamp { get; set; }
        public string DsCamp { get; set; }
        public string InOtherfacility { get; set; }
        public string DsOtherfacility { get; set; }
        public string InRawProduce { get; set; }
        public string DsRawProduce { get; set; }
        public string DsRecreationalWaterName { get; set; }
    }
}
