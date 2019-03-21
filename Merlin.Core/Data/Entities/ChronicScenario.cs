using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ChronicScenario
    {
        public int IdScenario { get; set; }
        public string DsScenario { get; set; }
        public short? IdSequence { get; set; }
        public string CdTestType1 { get; set; }
        public string DsResult1 { get; set; }
        public string DsCondition1 { get; set; }
        public string CdTestType2 { get; set; }
        public string DsResult2 { get; set; }
        public string CdIcd9 { get; set; }
        public string CdDxStatus { get; set; }
        public string DsComments { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
