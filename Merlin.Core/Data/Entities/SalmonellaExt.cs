﻿using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SalmonellaExt
    {
        public int IdCase { get; set; }
        public string InTravelThreeDayBefore { get; set; }
        public string InConsumePoultry { get; set; }
        public string DsConsumePoultry { get; set; }
        public string InConsumeBeef { get; set; }
        public string DsConsumeBeef { get; set; }
        public string InConsumePork { get; set; }
        public string DsConsumePork { get; set; }
        public string InConsumeFreshFruits { get; set; }
        public string DsConsumeFreshFruits { get; set; }
        public string InConsumeFreshVegetables { get; set; }
        public string DsConsumeFreshVegetables { get; set; }
        public string InConsumeEggs { get; set; }
        public string DsConsumeEggs { get; set; }
        public string InConsumeMilkProducts { get; set; }
        public string DsConsumeMilkProducts { get; set; }
        public string InConsumeStand { get; set; }
        public string DsConsumeStand { get; set; }
        public string InConsumeButcherEthnicMarket { get; set; }
        public string DsConsumeButcherEthnicMarket { get; set; }
        public string InConsumeSlaughtered { get; set; }
        public string DsConsumeSlaughtered { get; set; }
        public string InConsumeFoodRecall { get; set; }
        public string DsConsumeFoodRecall { get; set; }
        public string InConsumeAtRestaurant { get; set; }
        public string DsConsumeAtRestaurant { get; set; }
        public string CdConsumeAtRestaurantHist { get; set; }
        public string InEatGroupMeal { get; set; }
        public string DsEatGroupMeal { get; set; }
        public string InEatOutdoorSetting { get; set; }
        public string DsEatOutdoorSetting { get; set; }
        public string InRecWater { get; set; }
        public string DsRecWater { get; set; }
        public string CdRecWaterHist { get; set; }
        public string InDrinkUntreatedWater { get; set; }
        public string DsDrinkUntreatedWater { get; set; }
        public string CdDrinkUntreatedWaterHist { get; set; }
        public string InOutdoorActivities { get; set; }
        public string DsOutdoorActivities { get; set; }
        public string CdOutdoorActivitiesHist { get; set; }
        public string InExposureExcreta { get; set; }
        public string DsExposureExcreta { get; set; }
        public string InContactHealthcare { get; set; }
        public string DsContactHealthcare { get; set; }
        public string InContactDiapered { get; set; }
        public string DsContactDiapered { get; set; }
        public string InChildrenDaycare { get; set; }
        public string DsChildrenDaycare { get; set; }
        public string InLiveInstitution { get; set; }
        public string DsLiveInstitution { get; set; }
        public string InEpidemiologicLink { get; set; }
        public string DsEpidemiologicLink { get; set; }
        public string InExposureAnimals { get; set; }
        public string DsExposureAnimalOther { get; set; }
        public string CdExposureAnimalsHist { get; set; }
        public string CdExposureAnimals2Hist { get; set; }
        public string DsExposurePeriod { get; set; }
        public string CdWashHands { get; set; }
        public string CdUseSoapHand { get; set; }
        public string CdHoursSpendOutdoors { get; set; }
        public string CdSeeReptilesWeek { get; set; }
        public string CdShoesWornInside { get; set; }
        public string CdDishwasherRun { get; set; }
        public string CdMealsPrepared { get; set; }
        public string CdEggsPrepared { get; set; }
        public string CdMeatPreparedWeek { get; set; }
        public string CdMeatThawedCookingHist { get; set; }
        public string CdSurfacesUsedPrepareHist { get; set; }
        public string CdSurfacesCleanedHist { get; set; }
        public string InFruitsSameSurfacesMeal { get; set; }
        public int? AmHouseholdTotalPeople { get; set; }
        public int? AmHousehold5YearsOld { get; set; }
        public int? AmHouseholdPeopleDiapers { get; set; }
        public int? AmHouseholdToilets { get; set; }
        public int? AmHouseholdPets { get; set; }
        public string InCleanupPetFeces { get; set; }
        public string InCleanupPetFecesFrequently { get; set; }
        public string DsOccupationsHousehold { get; set; }
        public string InOccupationsExposureSoil { get; set; }
        public string InOccupationsExposureAnimals { get; set; }
        public string CdResidenceType { get; set; }
        public string CdResidenceSetting { get; set; }
        public string CdPipedWaterType { get; set; }
        public string CdWasteDisposalType { get; set; }
        public string InSepticTankFailures { get; set; }
        public string InSeparateSystemPiped { get; set; }
        public string InNeighborsPoultryLivestock { get; set; }
        public string InLiveNearIndustrialFarms { get; set; }
        public string DsExposurePeriodLongTerm { get; set; }
        public string InPrepareFoodSymptomatic { get; set; }
        public string DsPrepareFoodSymptomatic { get; set; }
        public string InContactsDiarrhea7Days { get; set; }
        public string CdContactsDiarrhea7DaysHist { get; set; }
        public string InContactsDiarrheaHousehold { get; set; }
        public string DsPublicHealthInformation { get; set; }
        public string InThreeDaysDiapers { get; set; }
        public string InThreeDaysCrawling { get; set; }
        public string InThreeDaysWalking { get; set; }
        public string InThreeDaysTeething { get; set; }
        public string InThreeDaysRideMeat { get; set; }
        public string InThreeDaysExposedDirtSand { get; set; }
        public string CdThreeDaysSpendFloor { get; set; }
        public string InThreeDaysBreastMilk { get; set; }
        public string DsThreeDaysBreastMilk { get; set; }
        public string InThreeDaysFormulaCan { get; set; }
        public string DsThreeDaysFormulaCan { get; set; }
        public string InThreeDaysFormulaPowder { get; set; }
        public string DsThreeDaysFormulaPowder { get; set; }
        public string CdThreeDaysFormulaPowderHist { get; set; }
        public string InThreeDaysHomemadeFood { get; set; }
        public string DsThreeDaysHomemadeFood { get; set; }
        public string InThreeDaysStoreFood { get; set; }
        public string DsThreeDaysStoreFood { get; set; }
        public string InThreeDaysHomemadeJuice { get; set; }
        public string DsThreeDaysHomemadeJuice { get; set; }
        public string InThreeDaysCereals { get; set; }
        public string DsThreeDaysCereals { get; set; }
        public string CdTeethingCleanedHist { get; set; }
        public string CdHowTeethingCleaned { get; set; }
        public string CdBottlesCleanedHist { get; set; }
        public string CdHowBottlesCleaned { get; set; }
        public string DsChildExposure { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InUseBottles { get; set; }
        public string InUseTeething { get; set; }
        public string DsPipedWaterType { get; set; }
        public string InTravelOvernight { get; set; }
        public string CdTravelTypeHist { get; set; }
        public string DsConsumeRestaurantOther { get; set; }
        public string InThreeDaysBreastMilkStore { get; set; }
        public string DsThreeDaysFormulaPowderOther { get; set; }
        public string InThreeDaysFormulaPowderWaterBoiled { get; set; }
        public string InPrepareRawMeat { get; set; }
        public string CdPrepareRawMeatHist { get; set; }
        public string DsPrepareRawMeatOther { get; set; }
        public string InConsumePoultryUndercooked { get; set; }
        public string InConsumeBeefUndercooked { get; set; }
        public string InConsumePorkUndercooked { get; set; }
        public string InConsumeFish { get; set; }
        public string DsConsumeFish { get; set; }
        public string InConsumeFishUndercooked { get; set; }
        public string InConsumeShellFish { get; set; }
        public string DsConsumeShellFish { get; set; }
        public string InConsumeShellFishUndercooked { get; set; }
        public string InConsumeEggsUndercooked { get; set; }
        public string InConsumeRawEggs { get; set; }
        public string DsConsumeRawEggs { get; set; }
        public string InConsumeCheese { get; set; }
        public string DsConsumeCheese { get; set; }
        public string InConsumePeanut { get; set; }
        public string DsConsumePeanut { get; set; }
        public string InConsumeNuts { get; set; }
        public string DsConsumeNuts { get; set; }
        public string InConsumeRawProduce { get; set; }
        public string DsConsumeRawProduce { get; set; }
        public string CdConsumeRawProduceHist { get; set; }
        public string InConsumeJuice { get; set; }
        public string DsConsumeJuice { get; set; }
        public string DsDrinkUntreatedWaterOther { get; set; }
        public string DsExposureAnimalSettingOther { get; set; }
        public string InPetsInHousehold { get; set; }
        public string CdPetFoodTypeHist { get; set; }
        public string DsPetFoodOther { get; set; }
        public string CdPetFoodWhereHist { get; set; }
        public string DsPetFoodLocationOther { get; set; }
        public string CdPetCleanFrequency { get; set; }
        public string DsAnimalHistoryComments { get; set; }
        public string DsOutdoorActivitiesOther { get; set; }
        public string DsRecWaterOther { get; set; }
        public string InThreeDaysToiletTrained { get; set; }
        public string DsTeethingCleanedOther { get; set; }
        public string InThreeDaysSuckFingers { get; set; }
        public string DsBottlesCleanedOther { get; set; }
        public string InThreeDaysSpendFloor { get; set; }
        public string CdWaterDrink { get; set; }
        public string CdMadeWaterDrink { get; set; }
        public string DsMeatThawedCookingOther { get; set; }
        public string DsSurfacesUsedPrepareOther { get; set; }
        public string DsSurfacesCleanedOther { get; set; }
        public string InWaterFilteredAtHome { get; set; }
        public string CdTypeFilterUsedHist { get; set; }
        public string DsResidenceTypeOther { get; set; }
        public string DsResidenceSettingOther { get; set; }
        public string DsWasteDisposalTypeOther { get; set; }
        public string DsTypeFilterUsedOther { get; set; }
        public string CdSerogroup { get; set; }
        public string CdSerotype { get; set; }
        public string InContactsDiarrhea24hAfter { get; set; }
        public string InContactsDiarrheaWithin24h { get; set; }
        public string InContactsDiarrhea24hBefore { get; set; }
        public string InContactsDiarrheaUnk { get; set; }
        public string InTravelInState { get; set; }
        public string InTravelOutState { get; set; }
        public string InTravelOutCountry { get; set; }
        public string InConsumeRestaurantFastFood { get; set; }
        public string InConsumeRestaurantSitDown { get; set; }
        public string InConsumeRestaurantSelfService { get; set; }
        public string InConsumeRestaurantDelivery { get; set; }
        public string InConsumeRestaurantOther { get; set; }
        public string InThreeDaysFormulaPowderUnfiltered { get; set; }
        public string InThreeDaysFormulaPowderBottled { get; set; }
        public string InThreeDaysFormulaPowderFiltered { get; set; }
        public string InThreeDaysFormulaPowderOther { get; set; }
        public string InPrepareRawMeatPoultry { get; set; }
        public string InPrepareRawMeatBeef { get; set; }
        public string InPrepareRawMeatPork { get; set; }
        public string InPrepareRawMeatFish { get; set; }
        public string InPrepareRawMeatShellfish { get; set; }
        public string InPrepareRawMeatOther { get; set; }
        public string InConsumeRawProduceFoodSalad { get; set; }
        public string InConsumeRawProduceLettuce { get; set; }
        public string InConsumeRawProducePeppers { get; set; }
        public string InConsumeRawProduceGreenOnions { get; set; }
        public string InConsumeRawProduceSprouts { get; set; }
        public string InConsumeRawProduceTomatoes { get; set; }
        public string InConsumeRawProduceCilantro { get; set; }
        public string InConsumeRawProduceCantaloupe { get; set; }
        public string InDrinkUntreatedWaterWell { get; set; }
        public string InDrinkUntreatedWaterOther { get; set; }
        public string InExposureAnimalsCat { get; set; }
        public string InExposureAnimalsLizard { get; set; }
        public string InExposureAnimalsBird { get; set; }
        public string InExposureAnimalsDog { get; set; }
        public string InExposureAnimalsSnake { get; set; }
        public string InExposureAnimalsHorse { get; set; }
        public string InExposureAnimalsTurtle { get; set; }
        public string InExposureAnimalsHamster { get; set; }
        public string InExposureAnimalsCow { get; set; }
        public string InExposureAnimalsFrog { get; set; }
        public string InExposureAnimalsDuck { get; set; }
        public string InExposureAnimalsGoat { get; set; }
        public string InExposureAnimalsFish { get; set; }
        public string InExposureAnimalsChicken { get; set; }
        public string InExposureAnimalsOther { get; set; }
        public string InExposureAnimalsSetPet { get; set; }
        public string InExposureAnimalsSetDayCare { get; set; }
        public string InExposureAnimalsSetFarm { get; set; }
        public string InExposureAnimalsSetZooFair { get; set; }
        public string InExposureAnimalsSetWild { get; set; }
        public string InExposureAnimalsSetOther { get; set; }
        public string InPetFoodTypeDry { get; set; }
        public string InPetFoodTypeFreshFrozen { get; set; }
        public string InPetFoodTypeRaw { get; set; }
        public string InPetFoodTypeOther { get; set; }
        public string InPetFoodTypeUnk { get; set; }
        public string InPetFoodWhereKitchen { get; set; }
        public string InPetFoodWhereLaundry { get; set; }
        public string InPetFoodWhereGarage { get; set; }
        public string InPetFoodWhereOther { get; set; }
        public string InPetFoodWhereUnk { get; set; }
        public string InOutdoorActivitiesPlaying { get; set; }
        public string InOutdoorActivitiesSports { get; set; }
        public string InOutdoorActivitiesCamping { get; set; }
        public string InOutdoorActivitiesFishing { get; set; }
        public string InOutdoorActivitiesYardWork { get; set; }
        public string InOutdoorActivitiesHiking { get; set; }
        public string InOutdoorActivitiesHunting { get; set; }
        public string InOutdoorActivitiesOther { get; set; }
        public string InRecWaterPool { get; set; }
        public string InRecWaterSpa { get; set; }
        public string InRecWaterRiver { get; set; }
        public string InRecWaterKidPoolHist { get; set; }
        public string InRecWaterFountain { get; set; }
        public string InRecWaterBoating { get; set; }
        public string InRecWaterWadPoolHist { get; set; }
        public string InRecWaterPark { get; set; }
        public string InRecWaterOcean { get; set; }
        public string InRecWaterOther { get; set; }
        public string InTeethingCleanedRinsed { get; set; }
        public string InTeethingCleanedSterilized { get; set; }
        public string InTeethingCleanedWashed { get; set; }
        public string InTeethingCleanedOther { get; set; }
        public string InTeethingCleanedDishwasher { get; set; }
        public string InTeethingCleanedUnk { get; set; }
        public string InBottlesCleanedRinsed { get; set; }
        public string InBottlesCleanedDishwasher { get; set; }
        public string InBottlesCleanedUnk { get; set; }
        public string InBottlesCleanedWashed { get; set; }
        public string InBottlesCleanedSterilized { get; set; }
        public string InBottlesCleanedBottleBrush { get; set; }
        public string InBottlesCleanedOther { get; set; }
        public string InMeatThawedCookingNeverFrozen { get; set; }
        public string InMeatThawedCookingRefrigerator { get; set; }
        public string InMeatThawedCookingMicrowave { get; set; }
        public string InMeatThawedCookingKitchen { get; set; }
        public string InMeatThawedCookingUnderWater { get; set; }
        public string InMeatThawedCookingOther { get; set; }
        public string InMeatThawedCookingUnk { get; set; }
        public string InSurfacesUsedPrepareWoodCut { get; set; }
        public string InSurfacesUsedPreparePlasticCut { get; set; }
        public string InSurfacesUsedPrepareCountertop { get; set; }
        public string InSurfacesUsedPrepareTable { get; set; }
        public string InSurfacesUsedPrepareSink { get; set; }
        public string InSurfacesUsedPreparePlate { get; set; }
        public string InSurfacesUsedPrepareOther { get; set; }
        public string InSurfacesUsedPrepareUnk { get; set; }
        public string InSurfacesCleanedNoClean { get; set; }
        public string InSurfacesCleanedRinsed { get; set; }
        public string InSurfacesCleanedWashed { get; set; }
        public string InSurfacesCleanedDishwasher { get; set; }
        public string InSurfacesCleanedDisinfected { get; set; }
        public string InSurfacesCleanedMultiSponge { get; set; }
        public string InSurfacesCleanedSingleSponge { get; set; }
        public string InSurfacesCleanedOther { get; set; }
        public string InSurfacesCleanedUnk { get; set; }
        public string InTypeFilterUsedPitcher { get; set; }
        public string InTypeFilterUsedFaucet { get; set; }
        public string InTypeFilterUsedRefrigerator { get; set; }
        public string InTypeFilterUsedSink { get; set; }
        public string InTypeFilterUsedWholeHouse { get; set; }
        public string InTypeFilterUsedOther { get; set; }
        public string InTypeFilterUsedUnk { get; set; }
        public string DsPfge { get; set; }
        public string DsCdcClusterCode { get; set; }
        public string InDrinkSharedWell { get; set; }
        public string InRecWaterKidWad { get; set; }
        public string DsPfgeFlorida { get; set; }
    }
}
