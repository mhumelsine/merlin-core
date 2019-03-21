using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakCluster
    {
        public string CdOutbreakCluster { get; set; }
        public string NmOutbreakCluster { get; set; }
        public string IdChanged { get; set; }
        public DateTime DtChanged { get; set; }
        public int InKey { get; set; }
    }
}
