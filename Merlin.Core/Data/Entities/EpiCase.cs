using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCase
    {
        public EpiCase()
        {
            CaseAntibioticList = new HashSet<CaseAntibioticList>();
            DeployPerson = new HashSet<DeployPerson>();
            EpiCaseContacts = new HashSet<EpiCaseContacts>();
            EpiCaseDefAnswers = new HashSet<EpiCaseDefAnswers>();
            FacilityExposure = new HashSet<FacilityExposure>();
            HepatitisPerinatalSourcesExt = new HashSet<HepatitisPerinatalSourcesExt>();
            LeadExtProfile = new HashSet<LeadExtProfile>();
            PediatricFluPathogensExt = new HashSet<PediatricFluPathogensExt>();
            TravelHistory = new HashSet<TravelHistory>();
            VaersPrevEvent = new HashSet<VaersPrevEvent>();
            VaersVaccine = new HashSet<VaersVaccine>();
        }

        public int IdCase { get; set; }
        public int? IdProfile { get; set; }
        public int? IdPhysician { get; set; }
        public string IdUserReview { get; set; }
        public string CdIcd9 { get; set; }
        public string CdDxStatus { get; set; }
        public string CdInvestigator { get; set; }
        public string CdImported { get; set; }
        public string DsOrigin { get; set; }
        public string CdOutbreak { get; set; }
        public DateTime? DtOnset { get; set; }
        public DateTime? DtDiagnosis { get; set; }
        public DateTime? DtLab { get; set; }
        public DateTime? DtReported { get; set; }
        public string DsReportedBy { get; set; }
        public string CdReportedType { get; set; }
        public short? AmWeek { get; set; }
        public short? AmYear { get; set; }
        public DateTime? DtEvent { get; set; }
        public string DsEventType { get; set; }
        public string DsZipOrig { get; set; }
        public string CdCountyOrig { get; set; }
        public string DsDaycare { get; set; }
        public string CdOccupation { get; set; }
        public string NmCompany { get; set; }
        public DateTime? DtLastAttended { get; set; }
        public string DsAdd1Company { get; set; }
        public string DsAdd2Company { get; set; }
        public string DsCityCompany { get; set; }
        public string DsStateCompany { get; set; }
        public string DsZipCompany { get; set; }
        public string DsFaxCompany { get; set; }
        public string DsPhnCompany { get; set; }
        public string InComplete { get; set; }
        public string CdStatus { get; set; }
        public DateTime? DtStatus { get; set; }
        public string CdExtdStatus { get; set; }
        public DateTime? DtExtdStatus { get; set; }
        public DateTime? DtEpiReported { get; set; }
        public DateTime? DtCdcReported { get; set; }
        public DateTime? DtEpiReReported { get; set; }
        public DateTime? DtCaseAccepted { get; set; }
        public DateTime? DtUpdated { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsCoReference { get; set; }
        public int? IdAnimalProfile { get; set; }
        public int? IdAnimalProfileAttached { get; set; }
        public string CdClosureReason { get; set; }
        public DateTime? DtClosure { get; set; }
        public string InOutbreak { get; set; }
        public DateTime? DtFlatfile { get; set; }
        public string CdOutcomeHist { get; set; }
        public string CdMilitaryBase { get; set; }
        public string InDeletedByBureauStaff { get; set; }
        public string InUnkTaskList { get; set; }
        public short? AmAge { get; set; }
        public string CdAnimalType { get; set; }
        public int? IdConfirmNonDoh { get; set; }
        public string CdCaseStatus { get; set; }
        public bool InAnimalExposure { get; set; }
        public bool InEcr { get; set; }
        public string CdClass { get; set; }
        public int IdCaseDef { get; set; }
        public int? IdOutbreak { get; set; }
        public string DsReason { get; set; }
        public string InHospitalized { get; set; }
        public string InProphalaxedHist { get; set; }
        public string CdFollowStatus { get; set; }
        public bool InJurisdiction { get; set; }
        public string CdJurisdiction { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string CdCountry { get; set; }
        public DateTime? DtFollowupStatus { get; set; }
        public bool InOverride { get; set; }
        public string DsFacility { get; set; }
        public bool InMeasures { get; set; }
        public DateTime? DtLabAttached { get; set; }
        public string InInvestigated { get; set; }
        public DateTime? DtInvestigated { get; set; }
        public string InInterviewed { get; set; }
        public DateTime? DtInterviewed { get; set; }
        public string CdRecipStatus { get; set; }
        public string InSymptomatic { get; set; }
        public string InEmergencyVisit { get; set; }
        public string InNotifiedElr { get; set; }
        public string CdCorrectional { get; set; }
        public byte? InCdcNotify { get; set; }
        public string InHospitalizedForDisease { get; set; }
        public DateTime? DtEarliestElr { get; set; }
        public string InPregnant { get; set; }
        public string InInsurance { get; set; }
        public string InMedicaid { get; set; }
        public string DsInsurance { get; set; }
        public string CdInsurance { get; set; }
        public string InDied { get; set; }
        public bool? InInterviewRecommended { get; set; }
        public DateTime? DtHl7Reported { get; set; }
        public string CdLevel { get; set; }
        public string InDiedFromIllness { get; set; }
        public string CdTravel { get; set; }
        public string CdTravelFlorida { get; set; }
        public string InCrfSubmit { get; set; }
        public string CdCountyAssigned { get; set; }
        public DateTime? DtAssignedAsOf { get; set; }

        public EpiProfile Profile { get; set; }

        public Resource IdPhysicianNavigation { get; set; }
        public ArboviralExt ArboviralExt { get; set; }
        public CiguateraExt CiguateraExt { get; set; }
        public CoPoisoningExt CoPoisoningExt { get; set; }
        public LegionellosisExt LegionellosisExt { get; set; }
        public LymeExt LymeExt { get; set; }
        public PediatricFluExt PediatricFluExt { get; set; }
        public StrepPneumoExt StrepPneumoExt { get; set; }
        public VaersExt VaersExt { get; set; }
        public VaersFollowup VaersFollowup { get; set; }
        public ICollection<CaseAntibioticList> CaseAntibioticList { get; set; }
        public ICollection<DeployPerson> DeployPerson { get; set; }
        public ICollection<EpiCaseContacts> EpiCaseContacts { get; set; }
        public ICollection<EpiCaseDefAnswers> EpiCaseDefAnswers { get; set; }
        public ICollection<FacilityExposure> FacilityExposure { get; set; }
        public ICollection<HepatitisPerinatalSourcesExt> HepatitisPerinatalSourcesExt { get; set; }
        public ICollection<LeadExtProfile> LeadExtProfile { get; set; }
        public ICollection<PediatricFluPathogensExt> PediatricFluPathogensExt { get; set; }
        public ICollection<TravelHistory> TravelHistory { get; set; }
        public ICollection<VaersPrevEvent> VaersPrevEvent { get; set; }
        public ICollection<VaersVaccine> VaersVaccine { get; set; }
    }
}
