using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakStatusHistory
    {
        public int IdOutbreak { get; set; }
        public string CdStatus { get; set; }
        public string CdReviewStatus { get; set; }
        public string CdCounty { get; set; }
        public string DsReason { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public int IdHistory { get; set; }

        public Outbreak IdOutbreakNavigation { get; set; }
    }
}
