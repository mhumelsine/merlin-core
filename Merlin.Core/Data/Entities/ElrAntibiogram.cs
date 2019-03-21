using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrAntibiogram
    {
        public int IdAntibiogram { get; set; }
        public int? IdElrOrder { get; set; }
        public int? IdElrRequest { get; set; }
        public int? IdElrObservation { get; set; }
        public string DsAccession { get; set; }
        public string CdTestType { get; set; }
        public string DsOrganism { get; set; }
        public string DsResult { get; set; }
        public DateTime? DtAdded { get; set; }
        public DateTime? DtBirth { get; set; }
        public string NmLast { get; set; }
        public string NmFirst { get; set; }
        public string DsZip { get; set; }
        public DateTime? DtCollected { get; set; }
        public string DsAbnormalFlag { get; set; }
        public string DsMethodology { get; set; }
        public string DsUnits { get; set; }
        public string DsResultComparator { get; set; }
        public string DsResultNumber1 { get; set; }
        public string DsResultSeparator { get; set; }
        public string DsResultNumber2 { get; set; }
        public string DsSendingApplication { get; set; }
        public DateTime? DtReported { get; set; }
        public string CdCounty { get; set; }
        public bool? InParent { get; set; }
        public int? IdFamily { get; set; }
        public string NmObservation { get; set; }
        public string NmObservationAlternate { get; set; }
        public bool? InDisqualify { get; set; }
        public string CdIsolate { get; set; }
        public DateTime? DtElrInserted { get; set; }
        public int? IdLab { get; set; }
        public int? IdLrv { get; set; }
    }
}
