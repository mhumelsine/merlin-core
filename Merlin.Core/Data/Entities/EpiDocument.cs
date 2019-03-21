using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiDocument : IAuditAdded
    {
        public int IdEpiDocument { get; set; }
        public byte[] BlEpiDocument { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string DsMimeContentType { get; set; }
    }
}
