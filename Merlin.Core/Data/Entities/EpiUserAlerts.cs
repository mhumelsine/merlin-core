using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiUserAlerts
    {
        public int IdUserAlert { get; set; }
        public string IdUser { get; set; }
        public string CdAlert { get; set; }
        public string CdIcd9 { get; set; }
        public string CdCounty { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public Icd9 CdIcd9Navigation { get; set; }
    }
}
