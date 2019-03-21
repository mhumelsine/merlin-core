using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrFilterRules
    {
        public string CdLabProvider { get; set; }
        public string CdAltObservation { get; set; }
        public string CdIcd9 { get; set; }
        public string CdSpecimen { get; set; }
        public string CdSpecimenOperand { get; set; }
        public string CdResultType { get; set; }
        public string InTestResult { get; set; }
        public string DsNumericResult { get; set; }
        public string CdNumericResultOperand { get; set; }
        public string DsTextLookup { get; set; }
        public string CdTextLookupOperand { get; set; }
        public string DsMerlinTestCode { get; set; }
        public string DsCommentLookup { get; set; }
        public string CdCommentLookupOperand { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdLoinc { get; set; }
        public bool? InDisplayTwoObservationDesc { get; set; }
        public bool? InGrouped { get; set; }
        public string DsSpecialHandling { get; set; }
        public bool? InCheckNotifyFlag { get; set; }
        public string DsNumericSeparator { get; set; }
        public string DsNumericSuffix { get; set; }
        public bool? InDisplayRefRange { get; set; }
        public bool? InDisplayUnits { get; set; }
        public byte AmOutcomeDoiflag { get; set; }
        public DateTime? DtExpire { get; set; }
        public int IdKey { get; set; }
        public string DsSnomedPhlip { get; set; }
        public string CdGrouped { get; set; }
    }
}
