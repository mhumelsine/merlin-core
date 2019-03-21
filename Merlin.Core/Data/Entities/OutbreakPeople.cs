using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakPeople
    {
        public int IdOutbreak { get; set; }
        public int IdSequence { get; set; }
        public int? IdSetting { get; set; }
        public int? IdCase { get; set; }
        public short? AmQuantity { get; set; }
        public string CdReasonType { get; set; }
        public DateTime? DtOnset { get; set; }
        public string NmLast { get; set; }
        public string NmFirst { get; set; }
        public string DsAddress { get; set; }
        public string DsCity { get; set; }
        public string DsZip { get; set; }
        public string CdState { get; set; }
        public string CdCounty { get; set; }
        public string CdCountry { get; set; }
        public string DsPhn { get; set; }
        public string CdOccupation { get; set; }
        public string CdDayCare { get; set; }
        public string CdDispositionPeople { get; set; }
        public DateTime? DtDisposition { get; set; }
        public DateTime? DtBirth { get; set; }
        public short? AmAge { get; set; }
        public string CdRace { get; set; }
        public string CdEthnicity { get; set; }
        public string CdGender { get; set; }
        public string AmDuration { get; set; }
        public string CdDurationIn { get; set; }
        public string CdOutcome { get; set; }
        public DateTime? DtOutcome { get; set; }
        public string DsNote { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsAgeUnit { get; set; }
        public bool? InDataEntryTab { get; set; }
        public string DsPhnWork { get; set; }
        public string DsPhnOther { get; set; }
        public int? IdLabElec { get; set; }
        public string InNamedContact { get; set; }
        public string CdInterviewStatus { get; set; }
        public string DsInterviewOther { get; set; }
        public string DsAddr2 { get; set; }
        public string InPrimary { get; set; }
        public string CdDxStatus { get; set; }
        public string CdInvestigator { get; set; }
        public string InHospitalized { get; set; }
        public string InProphalaxed { get; set; }
        public string CdFollowStatus { get; set; }
        public string CdInvestStatus { get; set; }
        public DateTime? DtDeath { get; set; }
        public DateTime? DtDiagnosis { get; set; }
        public DateTime? DtLab { get; set; }
        public DateTime? DtReported { get; set; }
        public string CdIcd9 { get; set; }
        public string InInvestigated { get; set; }
        public DateTime? DtInvestigated { get; set; }
        public string InInterviewed { get; set; }
        public DateTime? DtInterviewed { get; set; }
        public string InSymptomatic { get; set; }
        public string InEmergencyVisit { get; set; }
        public string InUsAddress { get; set; }
        public string CdCorrectional { get; set; }
        public string CdMilitaryBase { get; set; }
        public string CdReportedType { get; set; }
        public string InNotifiedElr { get; set; }
        public string InHospitalizedForDisease { get; set; }
    }
}
