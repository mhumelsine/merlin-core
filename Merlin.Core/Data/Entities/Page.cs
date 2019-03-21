using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Page
    {
        public int IdSec { get; set; }
        public string CdPage { get; set; }
        public string DsHelp { get; set; }
        public string CdField { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public bool? IsPageHeader { get; set; }
        public string DsSubPageCategory { get; set; }
        public string NmPage { get; set; }
    }
}
