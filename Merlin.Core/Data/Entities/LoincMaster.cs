using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LoincMaster
    {
        public int IdKey { get; set; }
        public string CdLoinc { get; set; }
        public string DsLoinc { get; set; }
        public string CdMerlinTestType { get; set; }
        public string CdMerlinTestTarget { get; set; }
        public string CdGrouping { get; set; }
        public string CdSpecimen { get; set; }
        public string CdMethodology { get; set; }
        public string CdIcd9 { get; set; }
        public string CdFluHeader { get; set; }
        public string CdRsvHeader { get; set; }
        public byte? InDoiflag { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }
        public string DsEHars { get; set; }
    }
}
