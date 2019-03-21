using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakLabResultValues
    {
        public int IdLabOutbreak { get; set; }
        public string CdLabTest { get; set; }
        public string CdTestType { get; set; }
        public string DsResult { get; set; }
        public string CdLabType { get; set; }
        public string NmObservation { get; set; }
        public string NmObservationAlternate { get; set; }
        public string DsReferenceRange { get; set; }
        public string DsUnits { get; set; }
        public string CdAbnormalFlag { get; set; }
        public int? IdElrOrder { get; set; }
        public int? IdElrObservation { get; set; }
        public string DsResultAlt { get; set; }
        public int IdLrvOutbreak { get; set; }
        public string DsLoinc { get; set; }
        public byte? InDoiflag { get; set; }
        public string DsMethodology { get; set; }
        public string CdElrResult { get; set; }
        public string DsElrResult { get; set; }
        public string CdElrAltResult { get; set; }
        public string DsElrAltResult { get; set; }
        public string DsNumericExpression { get; set; }
        public string CdObservationAlternate { get; set; }
        public decimal? AmNumericResult { get; set; }

        public OutbreakLabResults IdLabOutbreakNavigation { get; set; }
    }
}
