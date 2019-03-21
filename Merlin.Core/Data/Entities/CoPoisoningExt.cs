using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CoPoisoningExt
    {
        public int IdCase { get; set; }
        public string CdExposure { get; set; }
        public string DsExposure { get; set; }
        public string CdSiteExposure { get; set; }
        public string DsSiteExposure { get; set; }
        public string CdIntent { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InWorkRelated { get; set; }
        public string DsWorkRelated { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
