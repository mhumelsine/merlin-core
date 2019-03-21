using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiDocumentList
    {
        public int IdEpiDocumentList { get; set; }
        public string CdDocumentClass { get; set; }
        public string CdValue { get; set; }
        public int IdSequence { get; set; }
        public int IdEpiDocument { get; set; }
        public string DsDesc { get; set; }
        public string DsFileName { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string NmDocument { get; set; }
    }
}
