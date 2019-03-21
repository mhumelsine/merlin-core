﻿using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PesticideExt
    {
        public int IdCase { get; set; }
        public string NmPesticide { get; set; }
        public DateTime? DtExposDate { get; set; }
        public string CdExposTime { get; set; }
        public string InDrift { get; set; }
        public string InIndoorAir { get; set; }
        public string InLeakSpill { get; set; }
        public string InTargeted { get; set; }
        public string InSurface { get; set; }
        public string InUnknownExposure { get; set; }
        public string InOtherExposure { get; set; }
        public string DsOtherExposure { get; set; }
        public string CdExposureSite { get; set; }
        public string DsOtherSite { get; set; }
        public string CdExposureActivity { get; set; }
        public string DsOtherActivity { get; set; }
        public string CdWorkRelate { get; set; }
        public string NmCompany { get; set; }
        public string CdOccupation { get; set; }
        public string DsOtherOccupation { get; set; }
        public string CdPreExist { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsEpaRegistrationNum { get; set; }
        public string DsEpaDistributorNum { get; set; }
        public string DsActiveIngredientPct { get; set; }
        public string CdChemicalClass { get; set; }
        public string CdProductClass { get; set; }
        public string CdFunctionalClass { get; set; }
        public string CdPhysicalFormulation { get; set; }
        public string DsIncidentDescription { get; set; }
        public string InDermal { get; set; }
        public string InInhalation { get; set; }
        public string InIngestion { get; set; }
        public string InInjection { get; set; }
        public string InOcular { get; set; }
        public string InUnknownRoute { get; set; }
        public string CdLostTime { get; set; }
        public string DsLostDays { get; set; }
        public string CdIntentional { get; set; }
        public string CdOthersExposed { get; set; }
        public string CdTreatedArea { get; set; }
        public string CdAreaWaitTime { get; set; }
        public string CdEmployeeWarned { get; set; }
        public string CdEmployeeInformed { get; set; }
        public string CdEmployeeTrained { get; set; }
        public string CdEquipment { get; set; }
        public string CdEquipmentReq { get; set; }
        public string CdAirRespirator { get; set; }
        public string CdOrganicRespirator { get; set; }
        public string CdParticulateRespirator { get; set; }
        public string CdDustMask { get; set; }
        public string CdOtherRespiratory { get; set; }
        public string CdFullFace { get; set; }
        public string CdFaceShield { get; set; }
        public string CdChemicalGoggles { get; set; }
        public string CdSafetyGlasses { get; set; }
        public string CdOtherEye { get; set; }
        public string CdChemicalGloves { get; set; }
        public string CdClothGloves { get; set; }
        public string CdOtherHand { get; set; }
        public string CdLongShirt { get; set; }
        public string CdLongPants { get; set; }
        public string CdCoveralls { get; set; }
        public string CdChemicalSuits { get; set; }
        public string CdChemicalApron { get; set; }
        public string CdChemicalBoots { get; set; }
        public string CdChemicalHeadgear { get; set; }
        public string CdNonchemicalHeadgear { get; set; }
        public string CdOtherClothing { get; set; }
        public string CdClosedSystem { get; set; }
        public string CdEnclosedCab { get; set; }
        public string CdOtherControls { get; set; }
        public string CdApplication { get; set; }
        public string CdLicensing { get; set; }
        public string CdTargetSurface { get; set; }
        public string CdLocation { get; set; }
        public string CdLocationDesc { get; set; }
        public string CdPurpose { get; set; }
        public string CdTargetDisease { get; set; }
        public string CdCrop { get; set; }
        public string CdMedicalReceived { get; set; }
        public string CdMedicalReceivedType { get; set; }
        public string DsMedicalDiagnosis { get; set; }
        public string CdRecordsReceived { get; set; }
        public string DsPreExist { get; set; }
        public string CdMethodReported { get; set; }
        public string DsTreatment { get; set; }
        public string CdReportSourceInitial { get; set; }
        public string CdReportSourceSecond { get; set; }
        public string CdReportSourceAddl { get; set; }
        public string DsOccnarCode { get; set; }
        public string DsNaicsCode { get; set; }
        public string DsCicsCode { get; set; }
        public string CdIllnessRelated { get; set; }
        public string DsIllnessRelated { get; set; }
        public string CdFatal { get; set; }
        public string CdSeverity { get; set; }
        public string DsLengthHosp { get; set; }
        public string CdViolationFifra { get; set; }
        public string CdViolationOsha { get; set; }
        public string DsOtherViolations { get; set; }
        public string CdLabelFollowed { get; set; }
        public string CdContributingFactors { get; set; }
        public int? IdPhysician { get; set; }
    }
}
