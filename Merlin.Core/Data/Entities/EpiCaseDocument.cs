using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseDocument
    {
        public int IdCase { get; set; }
        public int IdEpiDocument { get; set; }
        public DateTime? DtEpiDocument { get; set; }
        public string DsDesc { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string CdDocumentType { get; set; }
        public string NmFile { get; set; }
    }
}
