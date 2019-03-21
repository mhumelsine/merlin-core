using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakLabElrPatvisit
    {
        public int PatVisitKey { get; set; }
        public int? RequestKey { get; set; }
        public int? IdOutbreakLab { get; set; }
        public string PatientClass { get; set; }
        public string AssignedPatientPointOfCare { get; set; }
        public string AssignedPatientRoom { get; set; }
        public string AssignedPatientBed { get; set; }
        public string AssignedPatientFacility { get; set; }
        public string AssignedPatientLocationStatus { get; set; }
        public string PersonLocationType { get; set; }
        public string AssignedPatientBuilding { get; set; }
        public string AssignedPatientFloor { get; set; }
        public string AssignedPatientLocationDescrip { get; set; }
        public string AdmissionType { get; set; }
        public string AttendingDoctorId { get; set; }
        public string AttendingDoctorName { get; set; }
        public string ReferringDoctorId { get; set; }
        public string ReferringDoctorName { get; set; }
        public string ConsultingDoctorId { get; set; }
        public string ConsultingDoctorName { get; set; }
        public string HospitalService { get; set; }
        public string AdmitSource { get; set; }
        public string AdmittingDoctorId { get; set; }
        public string AdmittingDoctorName { get; set; }
        public string PatientType { get; set; }
        public string VisitNumber { get; set; }
        public string DischargeDisposition { get; set; }
        public string DischargedToLocation { get; set; }
        public DateTime? DischargedToLocationDtm { get; set; }
        public string ServicingFacility { get; set; }
        public DateTime? AdmitDateTime { get; set; }
        public DateTime? DischargeDateTime { get; set; }
        public string AdmitReason { get; set; }
        public string EmploymentRelatedIllness { get; set; }
        public string ClinicOrganizationName { get; set; }
        public DateTime? FirstSimilarIllnessDate { get; set; }
        public string AdmitLevelOfCareCode { get; set; }
    }
}
