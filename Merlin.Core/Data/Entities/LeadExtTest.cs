using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LeadExtTest
    {
        public int IdCase { get; set; }
        public string CdFundingIblt { get; set; }
        public string CdTestReasonIblt { get; set; }
        public string CdProviderTypeIblt { get; set; }
        public string CdFundingFublt { get; set; }
        public string CdTestReasonFublt { get; set; }
        public string CdProviderTypeFublt { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
