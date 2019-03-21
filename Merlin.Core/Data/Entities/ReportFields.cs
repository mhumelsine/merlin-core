using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ReportFields
    {
        public string CdType { get; set; }
        public string CdValue { get; set; }
        public string NmLong { get; set; }
        public string NmShort { get; set; }
        public string DsAssociation { get; set; }
        public int? IdSequence { get; set; }
        public string DsElement { get; set; }
    }
}
