using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakSurvey
    {
        public int IdOutbreak { get; set; }
        public int IdQuestion { get; set; }
        public int? IdOrder { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdUpdated { get; set; }
        public DateTime? DtUpdated { get; set; }
        public DateTime? DtExpired { get; set; }
        public bool? InFromTemplate { get; set; }
    }
}
