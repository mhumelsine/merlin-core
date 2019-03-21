using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class VaersFollowup
    {
        public int IdCase { get; set; }
        public string DsVaersId { get; set; }
        public string DsEreportNum { get; set; }
        public DateTime? DtFollowUp { get; set; }
        public string DsReviewer { get; set; }
        public string InVaccinatedBefore { get; set; }
        public string InVaccinatedRecently { get; set; }
        public DateTime? DtVaccination { get; set; }
        public string DsVaccinationNum { get; set; }
        public string InVaccinatedChildhood { get; set; }
        public string InVaccinatedMilitary { get; set; }
        public string InVaccinatedLaboratory { get; set; }
        public string InDiagnosis { get; set; }
        public string DsDiagnosis { get; set; }
        public string InVigUsed { get; set; }
        public string InCidofovir { get; set; }
        public string InContraindication { get; set; }
        public string InPregnancy { get; set; }
        public string InImmunosuppression { get; set; }
        public string InSkinDisease { get; set; }
        public string InEyeDisease { get; set; }
        public string InAllergy { get; set; }
        public string DsContraindication { get; set; }
        public string InContacts { get; set; }
        public string InLocationHome { get; set; }
        public string InLocationHospital { get; set; }
        public string InLocationOther { get; set; }
        public string InLocationWorkplace { get; set; }
        public string InLocationUnknown { get; set; }
        public string InExposure { get; set; }
        public string InExpSkin { get; set; }
        public string InExpNeedle { get; set; }
        public string InExpDressing { get; set; }
        public string InExpObject { get; set; }
        public string InExpHealthcare { get; set; }
        public string InExpSexual { get; set; }
        public string InExpNursing { get; set; }
        public string InExpOther { get; set; }
        public string DsExpOther { get; set; }
        public string InTimingKnown { get; set; }
        public DateTime? DtExpStart { get; set; }
        public DateTime? DtExpEnd { get; set; }
        public string DsVaccineeNm { get; set; }
        public string DsVaccineeAddr1Name { get; set; }
        public string DsVaccineeAddr2 { get; set; }
        public string DsVaccineeCity { get; set; }
        public string CdVaccineeState { get; set; }
        public string DsVaccineeZip { get; set; }
        public string DsVaccineePhone { get; set; }
        public string InDisposition { get; set; }
        public string DsDisposition { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
