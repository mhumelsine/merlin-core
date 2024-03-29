﻿using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class VibrioExt
    {
        public int IdCase { get; set; }
        public string InOtherOrganism { get; set; }
        public string DsOtherOrganism { get; set; }
        public string InSpeciesConfirmed { get; set; }
        public string InSequelae { get; set; }
        public string DsSequelae { get; set; }
        public string InAntibioticTreatment { get; set; }
        public string DsAntibiotic1 { get; set; }
        public DateTime? DtBeganAntibiotic1 { get; set; }
        public DateTime? DtEndedAntibiotic1 { get; set; }
        public string DsAntibiotic2 { get; set; }
        public DateTime? DtBeganAntibiotic2 { get; set; }
        public DateTime? DtEndedAntibiotic2 { get; set; }
        public string DsAntibiotic3 { get; set; }
        public DateTime? DtBeganAntibiotic3 { get; set; }
        public DateTime? DtEndedAntibiotic3 { get; set; }
        public string InAlcoholism { get; set; }
        public string InDiabetes { get; set; }
        public string InDiabetesInsuline { get; set; }
        public string InPepticUlcer { get; set; }
        public string InGastricSurgery { get; set; }
        public string DsGastricSurgery { get; set; }
        public string InHeartDisease { get; set; }
        public string InHeartFailure { get; set; }
        public string InHematologicDisease { get; set; }
        public string DsHematologicDisease { get; set; }
        public string InImmunodeficiency { get; set; }
        public string DsImmunodeficiency { get; set; }
        public string InLiverDisease { get; set; }
        public string DsLiverDisease { get; set; }
        public string InMalignancy { get; set; }
        public string DsMalignancy { get; set; }
        public string InRenalDisease { get; set; }
        public string DsRenalDisease { get; set; }
        public string InOtherCondition { get; set; }
        public string DsOtherCondition { get; set; }
        public string InAntibiotics { get; set; }
        public string DsAntibiotics { get; set; }
        public string InChemotherapy { get; set; }
        public string DsChemotherapy { get; set; }
        public string InRadiotherapy { get; set; }
        public string DsRadiotherapy { get; set; }
        public string InSystemicSteroids { get; set; }
        public string DsSystemicSteroids { get; set; }
        public string InImmunosuppressants { get; set; }
        public string DsImmunosuppressants { get; set; }
        public string InAntacids { get; set; }
        public string DsAntacids { get; set; }
        public string InH2Blocker { get; set; }
        public string DsH2Blocker { get; set; }
        public string DsOutbreakCase { get; set; }
        public string InTravelOutside { get; set; }
        public string InConsumeClams { get; set; }
        public DateTime? DtConsumeClams { get; set; }
        public string InConsumeClamsRaw { get; set; }
        public string DsConsumeClamsWhere { get; set; }
        public string InConsumeCrab { get; set; }
        public DateTime? DtConsumeCrab { get; set; }
        public string InConsumeCrabRaw { get; set; }
        public string DsConsumeCrabWhere { get; set; }
        public string InConsumeLobster { get; set; }
        public DateTime? DtConsumeLobster { get; set; }
        public string InConsumeLobsterRaw { get; set; }
        public string DsConsumeLobsterWhere { get; set; }
        public string InConsumeMussels { get; set; }
        public DateTime? DtConsumeMussels { get; set; }
        public string InConsumeMusselsRaw { get; set; }
        public string DsConsumeMusselsWhere { get; set; }
        public string InConsumeOysters { get; set; }
        public DateTime? DtConsumeOysters { get; set; }
        public string InConsumeOystersRaw { get; set; }
        public string DsConsumeOystersWhere { get; set; }
        public string InConsumeShrimp { get; set; }
        public DateTime? DtConsumeShrimp { get; set; }
        public string InConsumeShrimpRaw { get; set; }
        public string DsConsumeShrimpWhere { get; set; }
        public string InConsumeCrawfish { get; set; }
        public DateTime? DtConsumeCrawfish { get; set; }
        public string InConsumeCrawfishRaw { get; set; }
        public string DsConsumeCrawfishWhere { get; set; }
        public string InConsumeShellfish { get; set; }
        public DateTime? DtConsumeShellfish { get; set; }
        public string InConsumeShellfishRaw { get; set; }
        public string DsConsumeShellfishWhere { get; set; }
        public string DsConsumeShellfishSpecify { get; set; }
        public string InConsumeFish { get; set; }
        public DateTime? DtConsumeFish { get; set; }
        public string InConsumeFishRaw { get; set; }
        public string DsConsumeFishWhere { get; set; }
        public string DsConsumeFishSpecify { get; set; }
        public string InBodyWater { get; set; }
        public string DsBodyWaterLocation { get; set; }
        public string InDrippingsSeafood { get; set; }
        public string InContactMarineLife { get; set; }
        public string InHandlingSeafood { get; set; }
        public string InSwimmingDiving { get; set; }
        public string InWalkingOnBeach { get; set; }
        public string InBoatingSkiing { get; set; }
        public string InConstructionRepairs { get; set; }
        public string InBittenStung { get; set; }
        public string CdExposedWaterType { get; set; }
        public string DsExposedWaterTypeOther { get; set; }
        public string DsExposedWaterComments { get; set; }
        public string CdExposedWound { get; set; }
        public string DsExposedWound { get; set; }
        public string CdSerotype { get; set; }
        public string CdBiotype { get; set; }
        public string InToxigenic { get; set; }
        public string CdToxigenic { get; set; }
        public string DsToxigenicOther { get; set; }
        public string InRawSeafood { get; set; }
        public string InCookedSeafood { get; set; }
        public string InForeingTravel { get; set; }
        public string InOtherPersonCholera { get; set; }
        public string InStreetVendedFood { get; set; }
        public string InOtherRisk { get; set; }
        public string DsOtherRisk { get; set; }
        public string InPreventionMeasure { get; set; }
        public string CdPreventionMeasure { get; set; }
        public string DsPreventionMeasureOther { get; set; }
        public string CdReasonTravel { get; set; }
        public string DsReasonTravelOther { get; set; }
        public string InCholeraVaccine { get; set; }
        public string CdCholeraVaccine { get; set; }
        public DateTime? DtCholeraVaccine { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? AmConsumeClamsLot { get; set; }
        public int? AmConsumeCrabLot { get; set; }
        public int? AmConsumeLobsterLot { get; set; }
        public int? AmConsumeMusselsLot { get; set; }
        public int? AmConsumeOystersLot { get; set; }
        public int? AmConsumeShrimpLot { get; set; }
        public int? AmConsumeCrawfishLot { get; set; }
        public int? AmConsumeShellfishLot { get; set; }
        public int? AmConsumeFishLot { get; set; }
        public DateTime? DtAntibiotics { get; set; }
        public DateTime? DtChemotherapy { get; set; }
        public DateTime? DtRadiotherapy { get; set; }
        public DateTime? DtSystemicSteroids { get; set; }
        public DateTime? DtImmunosuppressants { get; set; }
        public DateTime? DtAntacids { get; set; }
        public DateTime? DtH2Blocker { get; set; }
        public DateTime? DtSwimmingDiving { get; set; }
        public string AmSwimmingDivingTime { get; set; }
        public DateTime? DtWalkingOnBeach { get; set; }
        public string AmWalkingOnBeachTime { get; set; }
        public DateTime? DtBoatingSkiing { get; set; }
        public string AmBoatingSkiingTime { get; set; }
        public DateTime? DtConstructionRepairs { get; set; }
        public string AmConstructionRepairsTime { get; set; }
        public DateTime? DtBittenStung { get; set; }
        public string AmBittenStungTime { get; set; }
        public DateTime? DtHandlingSeafood { get; set; }
        public string AmHandlingSeafoodTime { get; set; }
        public string DsContactMarineLife { get; set; }
        public DateTime? DtContactMarineLife { get; set; }
        public string AmContactMarineLifeTime { get; set; }
        public string DsAntibiotic1Other { get; set; }
        public string DsAntibiotic2Other { get; set; }
        public string DsAntibiotic3Other { get; set; }
    }
}
