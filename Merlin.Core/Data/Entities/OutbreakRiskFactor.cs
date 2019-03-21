using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakRiskFactor
    {
        public int IdOutbreak { get; set; }
        public int IdQuestion { get; set; }
        public string DsQuestion { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string InYesNo { get; set; }
        public DateTime? DtExpire { get; set; }
        public int? IdOrder { get; set; }
    }
}
