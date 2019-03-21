using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakRiskFactorTmp
    {
        public int IdSerial { get; set; }
        public string IdSession { get; set; }
        public string IdUser { get; set; }
        public string DsQuestion { get; set; }
        public string InYesNo { get; set; }
        public DateTime? DtExpire { get; set; }
        public int? IdOrder { get; set; }
    }
}
