﻿using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HepatitisBcChronicExt
    {
        public int IdCase { get; set; }
        public string InBloodTransfusion { get; set; }
        public string InOrganTransplant { get; set; }
        public string InClottingFactor { get; set; }
        public string InBloodTransfusionPrior92 { get; set; }
        public string InOrganTransplantPrior92 { get; set; }
        public string InClottingFactorPrior87 { get; set; }
        public string InHemodialysis { get; set; }
        public string InInjectStreetDrugs { get; set; }
        public string NoOfSexualPartners { get; set; }
        public string InEverIncarcerated { get; set; }
        public string InEverStdTreated { get; set; }
        public string InSuspectedContact { get; set; }
        public string CdContactType { get; set; }
        public string DsOtherContactType { get; set; }
        public string InBloodContact { get; set; }
        public string InInfectedPast10Years { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdEducationLevel { get; set; }
        public string DsEmploymentStatusother { get; set; }
        public string CdInsuranceCoverage { get; set; }
        public string CdKindInsurance { get; set; }
        public string InAboutHepatitis { get; set; }
        public string CdReceiveInformation { get; set; }
        public string DsReceiveInformOther { get; set; }
        public string CdAboutHepatitis { get; set; }
        public string DsAboutHepatitisOther { get; set; }
        public string InNegativehcv { get; set; }
        public DateTime? DtNegativehcv { get; set; }
        public string CdWhereRecentNeghcv { get; set; }
        public string DsWhereReceNeghcvother { get; set; }
        public string CdExposedHepatitis { get; set; }
        public string InSeeingDoctor { get; set; }
        public string CdAlcoholicConsume { get; set; }
        public short? AmAgeStartDrinking { get; set; }
        public string InContactHepatitis { get; set; }
        public string DsTypeContactOther { get; set; }
        public string InRecInfusionsYounga { get; set; }
        public string InAccidentalStick { get; set; }
        public string InContactSomeoneBlood { get; set; }
        public string InDentalWorkOral { get; set; }
        public string InOtherSurgery { get; set; }
        public string InHadTattoo { get; set; }
        public string CdTattooPerformed { get; set; }
        public string DsTattooPerformedOther { get; set; }
        public string InBodyPiercing { get; set; }
        public string CdPiercingPerformed { get; set; }
        public string DsPiercingPerformOther { get; set; }
        public string InDiagnoseHiv { get; set; }
        public string CdNegativeHivTest { get; set; }
        public short? AmNumberPeopleInteract { get; set; }
        public string InPeopleInfected { get; set; }
        public string InPeopleInjectDrugs { get; set; }
        public string InPeoInjectDrugsMore5 { get; set; }
        public string InStreetDrugs { get; set; }
        public string InMarijuanahash { get; set; }
        public short? AmMarijuanahash { get; set; }
        public string InOxycontin { get; set; }
        public short? AmOxycontin { get; set; }
        public string InHallucinogens { get; set; }
        public short? AmHallucinogens { get; set; }
        public string InTranquilizers { get; set; }
        public short? AmTranquilizers { get; set; }
        public string InInhalants { get; set; }
        public short? AmInhalants { get; set; }
        public string InMethamphetamine { get; set; }
        public short? AmMethamphetamine { get; set; }
        public string InCrack { get; set; }
        public short? AmCrack { get; set; }
        public string InPowdercocaine { get; set; }
        public short? AmPowdercocaine { get; set; }
        public string InMethadone { get; set; }
        public short? AmMethadone { get; set; }
        public string InHeroin { get; set; }
        public short? AmHeroin { get; set; }
        public string DsOtherDrugs { get; set; }
        public short? AmAgeOtherDrugs { get; set; }
        public string InShareWorksDrugs { get; set; }
        public string CdGetDrugs { get; set; }
        public string DsGetDrugsOther { get; set; }
        public string InPooledMoney { get; set; }
        public string CdSixPastMonthInjected { get; set; }
        public string InUseNeedle { get; set; }
        public string InUseNeedleSomeone { get; set; }
        public string InDivUseNeedleSomeone { get; set; }
        public string InSpecialCircumstances { get; set; }
        public string InReusedNeedles { get; set; }
        public string InLoseTrackNeedle { get; set; }
        public string InSharedCleanedNeedle { get; set; }
        public string InUserInsewater { get; set; }
        public string InUseCookerUsed { get; set; }
        public string InUseCotton { get; set; }
        public string CdDrugsInjected { get; set; }
        public string DsDrugsInjectedOther { get; set; }
        public short? AmNumberPeopleInject { get; set; }
        public string InDrugTreatmentProg { get; set; }
        public short? AmTimesIndrugTreatment { get; set; }
        public string InCurrentTreatmentProg { get; set; }
        public short? AmLengthDrugTreatment { get; set; }
        public string CdLengthTreatment { get; set; }
        public string CdNumberSexPartners { get; set; }
        public short? AmNumberMale { get; set; }
        public short? AmNumberFemale { get; set; }
        public short? AmNumberExchange { get; set; }
        public short? AmNumberHepatitis { get; set; }
        public short? AmNumberInjectDruguser { get; set; }
        public string CdSexWithoutCondom { get; set; }
        public string InDetention { get; set; }
        public DateTime? DtDetentionStart { get; set; }
        public DateTime? DtDetentionEnd { get; set; }
        public string InDetentionMorethan6 { get; set; }
        public string CdKindprison { get; set; }
        public string DsTimeOther { get; set; }
        public string InPatientContacted { get; set; }
        public string CdResultOfContact { get; set; }
        public string CdReasonNoContact { get; set; }
        public string CdInterviewMode { get; set; }
        public string CdDxstatusInterview { get; set; }
        public string InCurrentlyIncarcerated { get; set; }
        public string InCurrentDrugTreatment { get; set; }
        public DateTime? DtInterview { get; set; }
        public short? AmLengthinterview { get; set; }
        public string InFloridaHepatGuide { get; set; }
        public DateTime? DtProvideGuide { get; set; }
        public DateTime? DtAttemptContactOne { get; set; }
        public DateTime? DtAttemptContactTwo { get; set; }
        public DateTime? DtAttemptContactThr { get; set; }
        public string InEmployedFullTime { get; set; }
        public string InStudentFullTime { get; set; }
        public string InEmployedPartTime { get; set; }
        public string InStudentPartTime { get; set; }
        public string InDisabledWork { get; set; }
        public string InUnemployed { get; set; }
        public string InEmployedRefused { get; set; }
        public string InEmployedOther { get; set; }
        public string InTypecontactSexual { get; set; }
        public string InTypecontactHousehold { get; set; }
        public string InTypecontactDrugUsing { get; set; }
        public string InTypecontactOther { get; set; }
        public string AmContactHepatitis { get; set; }
        public string AmBloodTransfuPrior92 { get; set; }
        public string AmOrganTransplPrior92 { get; set; }
        public string AmClottingFactPrior87 { get; set; }
        public string AmHemodialysisYounga { get; set; }
        public string AmEverStdTreated { get; set; }
        public string AmRecInfusionsYounga { get; set; }
        public string DsAccidentalStick { get; set; }
        public string AmContactSomeoneBlood { get; set; }
        public string AmDentalWorkOral { get; set; }
        public string AmOtherSurgery { get; set; }
        public string AmHadTattoo { get; set; }
        public string AmBodyPiercing { get; set; }
        public string AmDiagnoseHiv { get; set; }
        public string AmNegativeHivTest { get; set; }
        public string DsInterviewer { get; set; }
        public string InCurrently { get; set; }
        public string CdCorrectional { get; set; }
        public string CdBirthCountryMother { get; set; }
        public string InReceivedMedication { get; set; }
        public string CdHousing { get; set; }
        public string DsHouseOther { get; set; }
        public string InTreatmentAa { get; set; }
        public string InOtherDrugs { get; set; }
        public string InDilaudid { get; set; }
        public string InOpana { get; set; }
        public string InHavePrescription { get; set; }
        public string CdTreatmentProgram { get; set; }
        public short? AmFirstInject { get; set; }
        public string InFirstHeroin { get; set; }
        public string InFirstOxycontin { get; set; }
        public string InFirstDiluadid { get; set; }
        public string InFirstCocaine { get; set; }
        public string InFirstCrack { get; set; }
        public string InFirstXanax { get; set; }
        public string InFirstOther { get; set; }
        public string DsFirstOther { get; set; }
        public string InFirstRefused { get; set; }
        public string InLentUsed { get; set; }
        public string InUseNeedleNew { get; set; }
        public string InDividedDrugs { get; set; }
        public string InUsedRinsewater { get; set; }
        public string InUsedCooker { get; set; }
        public string InUsedCotton { get; set; }
        public string InInjectHeroin { get; set; }
        public string InInjectAmphetamine { get; set; }
        public string InInjectOxycontin { get; set; }
        public string InInjectDiluadid { get; set; }
        public string InInjectCocaine { get; set; }
        public string InInjectCrack { get; set; }
        public string InInjectXanax { get; set; }
        public string InInjectOther { get; set; }
        public string DsInjectOther { get; set; }
        public string InInjectRefused { get; set; }
        public string InInjected6Mos { get; set; }
        public string DsLastInjected { get; set; }
        public string InOftenOwn { get; set; }
        public string InOftenFriends { get; set; }
        public string InOftenDealers { get; set; }
        public string InOftenStreet { get; set; }
        public string InOftenGallery { get; set; }
        public string InOftenPrison { get; set; }
        public string InOftenOther { get; set; }
        public string DsOftenOther { get; set; }
        public string InOftenRefused { get; set; }
        public string InWithMoreExperience { get; set; }
        public string InWithLessExperience { get; set; }
        public string InWithSameExperience { get; set; }
        public string InWith5YearsOlder { get; set; }
        public string InWithCloseFriends { get; set; }
        public string InWithFamily { get; set; }
        public string InWithPartners { get; set; }
        public string InWithAcquaintances { get; set; }
        public string InWithDealer { get; set; }
        public string InWithStrangers { get; set; }
        public string InWithNoOne { get; set; }
        public string InWithOther { get; set; }
        public string InWithRefused { get; set; }
        public string InFitRecreational { get; set; }
        public string InFitAddicted { get; set; }
        public string InFitToBond { get; set; }
        public string InFitForSex { get; set; }
        public string InFitUnhappy { get; set; }
        public string InFitWantTo { get; set; }
        public string InFitNotAddicted { get; set; }
        public string InFitOccasions { get; set; }
        public string InFitHabit { get; set; }
        public string InFitOther { get; set; }
        public string DsFitOther { get; set; }
        public string InFitRefused { get; set; }
        public string CdInjectHabits { get; set; }
        public string DsInjectHabitsOther { get; set; }
        public string CdPartnersMale { get; set; }
        public string CdPartnersFemale { get; set; }
        public string CdPartnersExchange { get; set; }
        public string CdPartnersInfected { get; set; }
        public string CdPartnersUsers { get; set; }
        public string CdTimesUseCondom { get; set; }
        public string InTimeCounty { get; set; }
        public string InTimeState { get; set; }
        public string InTimeFederal { get; set; }
        public string InTimeJuvenile { get; set; }
        public string InTimeOther { get; set; }
        public string InTimeRefused { get; set; }
        public string InExposedInject { get; set; }
        public string InExposedSexual { get; set; }
        public string InExposedBlood { get; set; }
        public string InExposedContact { get; set; }
        public string InExposedTattoo { get; set; }
        public string InExposedNeedle { get; set; }
        public string InExposedDontKnow { get; set; }
        public string InExposedRefused { get; set; }
        public string CdDrinkAlcohol { get; set; }
        public string CdDrinkDay { get; set; }
        public string CdDrink6More { get; set; }
        public string InHcvPrimary { get; set; }
        public string DsHcvPrimary { get; set; }
        public string InHcvHospital { get; set; }
        public string DsHcvHospital { get; set; }
        public string InHcvPrison { get; set; }
        public string DsHcvPrison { get; set; }
        public string InHcvDrugFacility { get; set; }
        public string DsHcvDrugFacility { get; set; }
        public string InHcvCounseling { get; set; }
        public string DsHcvCounseling { get; set; }
        public string InHcvOther { get; set; }
        public string DsHcvOther { get; set; }
        public string InHcvRefused { get; set; }
        public string InDontKnow { get; set; }
        public string InFirstAmphetamine { get; set; }
        public string DsWithOther { get; set; }
        public string CdHowManyInject { get; set; }
        public string CdHowManyTimeInject { get; set; }
        public string DsHcvWhen { get; set; }
        public string InValidContactInfo { get; set; }
        public string InLexisContactChecked { get; set; }
        public string InPrismContactChecked { get; set; }
        public string InShotsContactChecked { get; set; }
        public string InHmsContactChecked { get; set; }
        public string InEHarsContactChecked { get; set; }
        public string InWhiteContactChecked { get; set; }
        public string InBrbpubContactChecked { get; set; }
        public string InPeopleContactChecked { get; set; }
        public string InInmateContactChecked { get; set; }
        public string InAccessContactChecked { get; set; }
        public string InVehicleContactChecked { get; set; }
        public string InVeteransContactChecked { get; set; }
        public string InLexisContactAvailable { get; set; }
        public string InPrismContactAvailable { get; set; }
        public string InShotsContactAvailable { get; set; }
        public string InHmsContactAvailable { get; set; }
        public string InEHarsContactAvailable { get; set; }
        public string InWhiteContactAvailable { get; set; }
        public string InBrbpubContactAvailable { get; set; }
        public string InPeopleContactAvailable { get; set; }
        public string InInmateContactAvailable { get; set; }
        public string InAccessContactAvailable { get; set; }
        public string InVehicleContactAvailable { get; set; }
        public string InVeteransContactAvailable { get; set; }
        public string InLexisContactValid { get; set; }
        public string InPrismContactValid { get; set; }
        public string InShotsContactValid { get; set; }
        public string InHmsContactValid { get; set; }
        public string InEHarsContactValid { get; set; }
        public string InWhiteContactValid { get; set; }
        public string InBrbpubContactValid { get; set; }
        public string InPeopleContactValid { get; set; }
        public string InInmateContactValid { get; set; }
        public string InAccessContactValid { get; set; }
        public string InVehicleContactValid { get; set; }
        public string InVeteransContactValid { get; set; }
        public short? AmSpentInvestigating { get; set; }
        public string CdCorrectionalInternal { get; set; }
        public string InPainKillers { get; set; }
        public string InSurveyOnline { get; set; }
        public string InDrugFacilityInvestig { get; set; }
        public string DsDrugTreatFacility { get; set; }
        public string InOtherContactChecked { get; set; }
        public string InOtherContactAvailable { get; set; }
        public string InOtherContactValid { get; set; }
        public string DsOtherContact { get; set; }
    }
}
