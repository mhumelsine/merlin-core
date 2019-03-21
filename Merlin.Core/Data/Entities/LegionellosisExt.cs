using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LegionellosisExt
    {
        public int IdCase { get; set; }
        public string InTravel { get; set; }
        public string InDentalHist { get; set; }
        public int? IdDentalHist { get; set; }
        public DateTime? DtDentalCareHist { get; set; }
        public string InHospitalHist { get; set; }
        public string InWorkHospitalHist { get; set; }
        public int? IdWorkHospitalHist { get; set; }
        public string InDetachable { get; set; }
        public string DsDetachable { get; set; }
        public string InHottubSpa { get; set; }
        public string DsHottubSpa { get; set; }
        public string InHumidifier { get; set; }
        public string DsHumidifierHist { get; set; }
        public string InCondenser { get; set; }
        public string DsCondenser { get; set; }
        public string InMistMachine { get; set; }
        public string DsMistMachine { get; set; }
        public string InFountain { get; set; }
        public string DsFountain { get; set; }
        public string DsOtherExposures { get; set; }
        public string InPlumbingRepair { get; set; }
        public string DsPlumbingRepair { get; set; }
        public DateTime? DtPlumbingRepair { get; set; }
        public string InPottingSoil { get; set; }
        public string InPneumoniaHist { get; set; }
        public string InXrayConfirmedHist { get; set; }
        public string InClinicalLegionHist { get; set; }
        public string InClinicalPontiacHist { get; set; }
        public string InClinicalOtherHist { get; set; }
        public string DsClinicalOther { get; set; }
        public string InClinicalUnknownHist { get; set; }
        public string InRiskCigarettes { get; set; }
        public string InRiskAlcohol { get; set; }
        public string InRiskImmunoTherapy { get; set; }
        public string InRiskImmunoConds { get; set; }
        public string InRiskCorticosteroids { get; set; }
        public string InRiskLung { get; set; }
        public string InRiskHeart { get; set; }
        public string InRiskTransplantation { get; set; }
        public string InRiskDiabetes { get; set; }
        public string InRiskRenal { get; set; }
        public string InRiskMalignancies { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InHeater122f { get; set; }
        public string DsRiskCigarettes { get; set; }
        public string DsHottubSpaDates { get; set; }
        public string InRespiratoryTherapy { get; set; }
        public string InWaterSterile { get; set; }
        public string InWaterDistilled { get; set; }
        public string InWaterBottled { get; set; }
        public string InWaterTap { get; set; }
        public string InWaterOther { get; set; }
        public string InWaterUnknown { get; set; }
        public string InHealthcareExposure { get; set; }
        public string InAssistedExposure { get; set; }
        public string CdAssociatedHealthcare { get; set; }
        public string DsAssociatedOther { get; set; }
        public string DsOutbreakName { get; set; }
        public string InReportedCdc { get; set; }
        public string DsOccupation { get; set; }
        public string CdClinicalDiagnosis { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
        public Resource IdDentalHistNavigation { get; set; }
        public Resource IdWorkHospitalHistNavigation { get; set; }
    }
}
