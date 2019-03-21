using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AutoScenario
    {
        public int IdAutoScenario { get; set; }
        public string NmAutoScenario { get; set; }
        public string CdAutoScenario { get; set; }
        public string DsCondition { get; set; }
        public string DsCounty { get; set; }
        public int? IdSequence { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdAutoType { get; set; }
        public string DsMessage { get; set; }
        public int? IdPriority { get; set; }
    }
}
