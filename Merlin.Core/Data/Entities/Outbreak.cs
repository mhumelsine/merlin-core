using System;
using System.Collections.Generic;
using Isf.Core.Cqrs;

namespace Merlin.Core.Data
{
    public partial class Outbreak
    {
        public Outbreak()
        {
            DeployArea = new HashSet<DeployArea>();
            OutbreakAggregate = new HashSet<OutbreakAggregate>();
            OutbreakEvents = new HashSet<OutbreakEvents>();
            OutbreakLabSpecimen = new HashSet<OutbreakLabSpecimen>();
            OutbreakSettings = new HashSet<OutbreakSettings>();
            OutbreakStatusHistory = new HashSet<OutbreakStatusHistory>();
        }

        public int IdOutbreak { get; set; }
        public string NmOutbreak { get; set; }
        public string CdCountyInitiating { get; set; }
        public DateTime? DtEarliestOnset { get; set; }
        public DateTime? DtLastOnset { get; set; }
        public DateTime? DtInvestigated { get; set; }
        public string CdOutbreakType { get; set; }
        public string AmPeopleAffected { get; set; }
        public string CdIcd9 { get; set; }
        public string CdSyndromes { get; set; }
        public string CdOrganism { get; set; }
        public string CdSerogroup { get; set; }
        public string CdSpecies { get; set; }
        public string DsPfge { get; set; }
        public string CdReporterType { get; set; }
        public string NmReporter { get; set; }
        public string DsReporterPhn { get; set; }
        public string NmProvider { get; set; }
        public string DsProviderPhn { get; set; }
        public string NmInvestigator { get; set; }
        public string CdStatus { get; set; }
        public DateTime? DtClosed { get; set; }
        public string CdModeTransmission { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public DateTime? DtStatus { get; set; }
        public string CdClosureReason { get; set; }
        public DateTime? DtClosureReason { get; set; }
        public string CdOutbreakCounty { get; set; }
        public string InMultiCounty { get; set; }
        public bool? InSurveillance { get; set; }
        public DateTime? DtChdNotified { get; set; }
        public int? IdEpicomPost { get; set; }
        public string DsEpicomPost { get; set; }
        public string InFoodWater { get; set; }
        public string DsDiseaseHazardOther { get; set; }
        public string DsSyndromeOther { get; set; }
        public int AmEstimatedIll { get; set; }
        public string InOutbreak { get; set; }
        public string DsMultiCounty { get; set; }
        public string DsMultiState { get; set; }
        public string DsMultiCountry { get; set; }
        public string InVehicleFw { get; set; }
        public string DsVehicleFw { get; set; }
        public string InHealthcare { get; set; }
        public string InLabConducted { get; set; }
        public int? AmTotalExposed { get; set; }
        public int? AmNonStaffCases { get; set; }
        public int? AmNonStaffExposed { get; set; }
        public int? AmStaffCases { get; set; }
        public int? AmStaffExposed { get; set; }
        public int? AmAgeLess1 { get; set; }
        public int? AmAge14 { get; set; }
        public int? AmAge59 { get; set; }
        public int? AmAge1019 { get; set; }
        public int? AmAge2049 { get; set; }
        public int? AmAge5074 { get; set; }
        public int? AmAgeGreater74 { get; set; }
        public int? AmAgeUnknown { get; set; }
        public int? AmSoughtHealthcare { get; set; }
        public int? AmErVisit { get; set; }
        public int? AmHospitalization { get; set; }
        public int? AmDied { get; set; }
        public int? AmMale { get; set; }
        public int? AmFemale { get; set; }
        public int? AmGenderUnknown { get; set; }
        public DateTime? DtEarliestExposure { get; set; }
        public DateTime? DtLastExposure { get; set; }
        public short? AmLabConfirmed { get; set; }
        public string InLabConfirmedFood { get; set; }
        public string InRecommendations { get; set; }
        public string CdRecommendationsHow { get; set; }
        public string InImplemented { get; set; }
        public string InInternalAction { get; set; }
        public int? AmMedianDuration { get; set; }
        public int? AmTotalCases { get; set; }
        public string InLabConfirmed { get; set; }
        public string CdReviewStatus { get; set; }
        public bool? InExcludeActive { get; set; }
        public DateTime? DtReview { get; set; }
        public string IdReviewer { get; set; }
        public string InMultiState { get; set; }
        public string DsReason { get; set; }
        public string InInvestigated { get; set; }
        public int? AmWithInfoSought { get; set; }
        public int? AmWithInfoErVisit { get; set; }
        public int? AmWithInfoHospitalization { get; set; }
        public int? AmWithInfoDied { get; set; }
        public bool? InSurvey { get; set; }
        public DateTime? DtOutbreakEvent { get; set; }
        public string DsStateConsulted { get; set; }
        public string InVehicleHai { get; set; }
        public string DsVehicleHai { get; set; }
        public string CdEventType { get; set; }
        public int? AmUnknownCases { get; set; }
        public int? AmUnknownExposed { get; set; }
        public int? InPreCods { get; set; }
        public string CdMedianDurationUnit { get; set; }
        public int? IdEpicomPending { get; set; }
        public string CdVehicleIdentified { get; set; }
        public int? AmErDeptVisits { get; set; }
        public string CdErDeptVisitsType { get; set; }
        public int? AmInpatientHospital { get; set; }
        public string CdInpatientHosptialType { get; set; }
        public int? AmDeaths { get; set; }
        public string CdDeathsType { get; set; }
        public string CdTotalCaseType { get; set; }
        public ICollection<DeployArea> DeployArea { get; set; }
        public ICollection<OutbreakAggregate> OutbreakAggregate { get; set; }
        public ICollection<OutbreakEvents> OutbreakEvents { get; set; }
        public ICollection<OutbreakLabSpecimen> OutbreakLabSpecimen { get; set; }
        public ICollection<OutbreakSettings> OutbreakSettings { get; set; }
        public ICollection<OutbreakStatusHistory> OutbreakStatusHistory { get; set; }
        public ICollection<OutbreakSymptoms> OutbreakSymptoms { get; set; }
    }
}
