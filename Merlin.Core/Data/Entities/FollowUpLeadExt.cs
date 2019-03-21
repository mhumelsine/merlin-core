using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class FollowUpLeadExt
    {
        public int IdCase { get; set; }
        public int IdFollowUp { get; set; }
        public string InPica { get; set; }
        public string InMouthing { get; set; }
        public string CdTreatment { get; set; }
        public DateTime? DtTreatmentStart { get; set; }
        public DateTime? DtTreatmentEnd { get; set; }
        public string CdAppetite { get; set; }
        public string CdDiet { get; set; }
        public string InAnemia { get; set; }
        public string InPregnant { get; set; }
        public DateTime? DtDue { get; set; }
        public string InOtherMedical { get; set; }
        public string DsOtherMedical { get; set; }
        public string InWic { get; set; }
        public string InCounseling { get; set; }
        public string InMedicaid { get; set; }
        public string DsMedicaid { get; set; }
        public string InImmigrant { get; set; }
        public string InRefugee { get; set; }
        public string InAdoption { get; set; }
        public string CdOrigin { get; set; }
        public string DsOtherOrigin { get; set; }
        public string CdExposure1 { get; set; }
        public string CdExpType1 { get; set; }
        public string DsExpType1 { get; set; }
        public string CdExposure2 { get; set; }
        public string CdExpType2 { get; set; }
        public string DsExpType2 { get; set; }
        public string CdExposure3 { get; set; }
        public string CdExpType3 { get; set; }
        public string DsExpType3 { get; set; }
        public string CdExposure4 { get; set; }
        public string CdExpType4 { get; set; }
        public string DsExpType4 { get; set; }
        public string CdCaseClosure { get; set; }
        public DateTime? DtCaseClosure { get; set; }
        public string InSiteVisit { get; set; }
        public DateTime? DtSiteVisit { get; set; }
        public string CdTypeSite { get; set; }
        public string DsTypeSite { get; set; }
        public string InPostConfirm6Yrs { get; set; }
        public string InTwoPostConfirm6Yrs { get; set; }
        public string InPostConfirm615Yrs { get; set; }
        public string InNoResponse { get; set; }
        public string InMissedAppointment { get; set; }
        public string InParentsRefuse { get; set; }
        public string InMoved { get; set; }
        public string InMoveType { get; set; }
        public string InMoveAction { get; set; }
        public string CdMovedToCounty { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
