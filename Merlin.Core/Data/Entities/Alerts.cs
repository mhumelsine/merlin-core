using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Alerts
    {
        public string CdAlertCode { get; set; }
        public string DsDescription { get; set; }
        public string DsEmailMessage { get; set; }
        public string CdAlertType { get; set; }
        public string AmTimePeriod { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int IdAlert { get; set; }
        public string DsTextHelp { get; set; }
        public int? AmOrder { get; set; }
        public bool? InAdvance { get; set; }
    }
}
