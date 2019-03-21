using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Lab
    {
        public Lab()
        {
            OutbreakLabResults = new HashSet<OutbreakLabResults>();
        }

        public int IdLab { get; set; }
        public int? IdProfile { get; set; }
        public int IdCase { get; set; }
        public int IdPanel { get; set; }
        public string DsAccession { get; set; }
        public int? IdLaboratory { get; set; }
        public int? IdProvider { get; set; }
        public string CdIcd9 { get; set; }
        public string CdLabTest { get; set; }
        public string CdSpecimen { get; set; }
        public string DsResult { get; set; }
        public DateTime? DtCollected { get; set; }
        public DateTime? DtReceived { get; set; }
        public DateTime? DtReported { get; set; }
        public string CdCounty { get; set; }
        public string CdLabStatus { get; set; }
        public string CdDisposition { get; set; }
        public DateTime? DtStatus { get; set; }
        public string DsNotes { get; set; }
        public DateTime? DtFlatfile { get; set; }
        public DateTime? DtUpdated { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? IdAnimalProfile { get; set; }
        public string CdSpecimenCond { get; set; }
        public string DsSpecimen { get; set; }
        public string DsSpcimenCond { get; set; }
        public string InThirdParty { get; set; }
        public string DsThirdParty { get; set; }
        public DateTime? DtThirdParty { get; set; }
        public string CdInvestigator { get; set; }
        public DateTime? DtElrXmit { get; set; }
        public string IdObservation { get; set; }
        public string CdObservation { get; set; }
        public string DsElrSpecimen { get; set; }
        public int? IdLabOutbreak { get; set; }
        public int? IdOrderFacility { get; set; }
        public string DsElrAddressProvider { get; set; }
        public string DsElrAddressFacility { get; set; }
        public DateTime? DtLabEvent { get; set; }
        public bool? InComplete { get; set; }
        public string InLabExposures { get; set; }
        public string CdRecipStatus { get; set; }
        public int? AmExposuresHigh { get; set; }
        public int? AmExposuresLow { get; set; }
        public string DsDisclaimer { get; set; }
        public string InPregnancy { get; set; }
        public string CdTestType { get; set; }
        public string CdSerogroup { get; set; }
        public string CdSerotype { get; set; }
        public string DsPfge { get; set; }
        public string CdStrain { get; set; }
        public string CdBiotype { get; set; }
        public string DsResultOverall { get; set; }
        public string DsPfgeFlorida { get; set; }
        public string DsPfgeSecondary { get; set; }
        public string DsCdcClusterCode { get; set; }
        public string DsWgsClusterCode { get; set; }
        public string DsReason { get; set; }
        public int? IdFamily { get; set; }
        public string CdLabEventType { get; set; }
        public int? IdPerformingLab { get; set; }

        public Resource IdLaboratoryNavigation { get; set; }
        public Resource IdOrderFacilityNavigation { get; set; }
        public Resource IdProviderNavigation { get; set; }
        public ICollection<OutbreakLabResults> OutbreakLabResults { get; set; }
    }
}
