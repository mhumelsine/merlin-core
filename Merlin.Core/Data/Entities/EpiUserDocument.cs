using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiUserDocument
    {
        public string IdUser { get; set; }
        public int IdEpiDocument { get; set; }
        public DateTime? DtEpiDocument { get; set; }
        public string DsDesc { get; set; }
        public string NmFile { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
    }
}
