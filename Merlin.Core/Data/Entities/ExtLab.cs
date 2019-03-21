using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ExtLab
    {
        public int IdCase { get; set; }
        public string CdSerogroup { get; set; }
        public string CdSerotype { get; set; }
        public string CdBiotype { get; set; }
        public string CdStrain { get; set; }
        public string DsPfge { get; set; }
        public string DsPfgeSecondary { get; set; }
        public string DsPfgeFlorida { get; set; }
        public string DsCdcClusterCode { get; set; }
        public string DsWgsClusterCode { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
