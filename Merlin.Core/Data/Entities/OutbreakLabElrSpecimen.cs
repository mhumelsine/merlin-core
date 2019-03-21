using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakLabElrSpecimen
    {
        public int Spmkey { get; set; }
        public int? IdLabOutbreak { get; set; }
        public int? OrderKey { get; set; }
        public string SpmId1 { get; set; }
        public string SpmId2 { get; set; }
        public string SpmTypeCode { get; set; }
        public string SpmTypeDescrip { get; set; }
        public string AltSpmTypeCode { get; set; }
        public string AltSpmTypeDesc { get; set; }
        public string SpmTypeText { get; set; }
        public string AltSpmTwoTypeCode { get; set; }
        public string AltSpmTwoTypeDesc { get; set; }
        public string SpmCollectMethodCode { get; set; }
        public string SpmCollectMethodDesc { get; set; }
        public string AltSpmCollectMethodCode { get; set; }
        public string AltSpmCollectMethodDesc { get; set; }
        public string SpmCollectText { get; set; }
        public string AltSpmTwoCollectMethodCode { get; set; }
        public string AltSpmTwoCollectMethodDesc { get; set; }
        public string SpmConditionCode { get; set; }
        public string SpmConditionDesc { get; set; }
        public string AltSpmConditionCode { get; set; }
        public string AltSpmConditionDesc { get; set; }
        public string SpmConditionText { get; set; }
        public string AltSpmTwoConditionCode { get; set; }
        public string AltSpmTwoConditionDesc { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime? DtSpmCollected { get; set; }
        public DateTime? DtSpmReceived { get; set; }
        public string OrderSpecimenTypeCode { get; set; }
        public string OrderSpecimenTypeName { get; set; }
    }
}
