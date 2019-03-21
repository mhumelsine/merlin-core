using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class FollowUpEpiCase
    {
        public int IdCase { get; set; }
        public int IdFollowUp { get; set; }
        public int IdProfile { get; set; }
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
        public DateTime? DtUpdated { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsCoReference { get; set; }
        public string CdOutcome { get; set; }
        public string CdMilitaryBase { get; set; }
        public string InDeletedByBureauStaff { get; set; }
        public int? InOutbreak { get; set; }
        public DateTime? DtCaseAccepted { get; set; }
        public DateTime? DtClosure { get; set; }
        public DateTime? DtFlatfile { get; set; }
        public int? IdAnimalProfile { get; set; }
        public int? IdAnimalProfileAttached { get; set; }
        public int? AmYear { get; set; }
        public short? AmAge { get; set; }
        public string CdClosureReason { get; set; }
        public string InUnkTaskList { get; set; }
        public string CdAnimalType { get; set; }
        public bool? InAnimalExposure { get; set; }
        public bool? InEcr { get; set; }
        public int? IdCaseDef { get; set; }
        public int? IdConfirmNonDoh { get; set; }
        public string CdClass { get; set; }
        public int? IdOutbreak { get; set; }
        public string CdCaseStatus { get; set; }
        public string DsReason { get; set; }
        public string InHospitalized { get; set; }
        public string InProphalaxed { get; set; }
        public string CdFollowStatus { get; set; }

        public Resource IdPhysicianNavigation { get; set; }
    }
}
