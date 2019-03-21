using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AmrAntibiogram
    {
        public int IdAntibiogram { get; set; }
        public int? IdElrOrder { get; set; }
        public int? IdElrRequest { get; set; }
        public int? IdElrObservation { get; set; }
        public int? IdElrPatvisit { get; set; }
        public string NmLast { get; set; }
        public string NmFirst { get; set; }
        public DateTime? DtBirth { get; set; }
        public short? AmAge { get; set; }
        public string DsGender { get; set; }
        public string DsZip { get; set; }
        public int? CdCounty { get; set; }
        public string DsPatientClass { get; set; }
        public string DsClinicalService { get; set; }
        public DateTime? DtAdmit { get; set; }
        public string DsSpecimenId { get; set; }
        public string DsSpecimenSite { get; set; }
        public string DsSendingApplication { get; set; }
        public string DsOrderingFacility { get; set; }
        public DateTime? DtCollected { get; set; }
        public DateTime? DtReported { get; set; }
        public string CdCaHai { get; set; }
        public string CdOrganismGroup { get; set; }
        public string CdSnomedConcept { get; set; }
        public string DsOrganism { get; set; }
        public string DsAlternateResult { get; set; }
        public string DsResult { get; set; }
        public string CdAgent { get; set; }
        public string DsInterpretation { get; set; }
        public string DsLocalCode { get; set; }
        public string DsTestMethod { get; set; }
        public string DsUnits { get; set; }
        public string CdSpecialTesting { get; set; }
        public string DsResultComparator { get; set; }
        public string DsResultNumber1 { get; set; }
        public string DsResultSeparator { get; set; }
        public string DsResultNumber2 { get; set; }
        public string NmObservation { get; set; }
        public string NmObservationAlternate { get; set; }
        public bool? InParent { get; set; }
        public int? IdFamily { get; set; }
        public bool? InDisqualify { get; set; }
        public DateTime? DtAdded { get; set; }
        public DateTime? DtElrInserted { get; set; }
        public string CdIcd9 { get; set; }
        public int? IdLab { get; set; }
        public int? IdLrv { get; set; }
    }
}
