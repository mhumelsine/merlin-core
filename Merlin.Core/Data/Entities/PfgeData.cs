using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PfgeData
    {
        public int IdKey { get; set; }
        public string DsAccession { get; set; }
        public string DsPfge { get; set; }
        public string DsPnSerotype { get; set; }
        public string DsOgroup { get; set; }
        public string DsSerotype { get; set; }
        public byte? InImported { get; set; }
        public DateTime? DtImported { get; set; }
        public string DsErrorMsg { get; set; }
        public DateTime? DtAdded { get; set; }
        public string DsPfgeSecondary { get; set; }
        public string DsPfgeFlorida { get; set; }
        public string DsCdcClusterCode { get; set; }
        public string DsWgsClusterCode { get; set; }
    }
}
