using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class DeployTag
    {
        public int IdArea { get; set; }
        public int IdLocation { get; set; }
        public int IdTag { get; set; }
        public string CdTagType { get; set; }
        public string DsTag { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public DeployLocation Id { get; set; }
    }
}
