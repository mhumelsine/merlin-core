using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class VaersExt
    {
        public int IdCase { get; set; }
        public string DsFormCompletedBy { get; set; }
        public string CdRelation { get; set; }
        public string DsAddr1Name { get; set; }
        public string DsAddr2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string DsPhone { get; set; }
        public DateTime? DtFormCompleted { get; set; }
        public string InMedicineEffect { get; set; }
        public string InEncephPostVaccine { get; set; }
        public string InGenVaccine { get; set; }
        public string InInfection { get; set; }
        public string InKeralitisSuperficial { get; set; }
        public string InKeralitisConjunct { get; set; }
        public string InOtherAdverseEvent { get; set; }
        public string DsOtherAdverseEvent { get; set; }
        public string DsTreatment { get; set; }
        public string InPatientDied { get; set; }
        public DateTime? DtPatientDied { get; set; }
        public string InReqHospitalization { get; set; }
        public short? AmDaysHospitalized { get; set; }
        public string InLifeThreatIllness { get; set; }
        public string InReqEmergencyVisit { get; set; }
        public string InProlongedHospitalized { get; set; }
        public string InPermDisability { get; set; }
        public string InNoneOfAbove { get; set; }
        public string InPatientRecovery { get; set; }
        public DateTime? DtVaccination { get; set; }
        public DateTime? DtAdverseEvent { get; set; }
        public string InVaccineAtPrivateDoctor { get; set; }
        public string InVaccineAtPublicHealth { get; set; }
        public string InVaccineAtMilitaryClinic { get; set; }
        public string InVaccineAtOther { get; set; }
        public string DsVaccineAtOther { get; set; }
        public string InFundPrivate { get; set; }
        public string InFundPublic { get; set; }
        public string InFundMilitary { get; set; }
        public string InFundOther { get; set; }
        public string DsFundOther { get; set; }
        public string DsOtherMedication { get; set; }
        public string DsIllness { get; set; }
        public string DsPreExistingCondition { get; set; }
        public string InEventReported { get; set; }
        public string InEventReportedDoctor { get; set; }
        public string InEventReportedDept { get; set; }
        public string InEventReportedMfr { get; set; }
        public short? AmBirthWtLb { get; set; }
        public short? AmBirthWtOz { get; set; }
        public short? AmSiblingCount { get; set; }
        public string DsPrjReportNum { get; set; }
        public DateTime? DtPrjReportReceived { get; set; }
        public string In15Day { get; set; }
        public string CdReportType { get; set; }
        public string DsVaccineAdminBy { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
