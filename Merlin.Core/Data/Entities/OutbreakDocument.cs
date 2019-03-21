using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakDocument : IAuditAdded
    {
        public int IdEpiDocument { get; set; }
        public int IdOutbreak { get; set; }
        public DateTime DtEpiDocument { get; set; }
        public string DsDesc { get; set; }
        public string NmFile { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public int? IdSequence { get; set; }
        public string CdEpiDocumentType { get; set; }
    }
}
