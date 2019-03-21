using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakEvents : IAuditAdded, IAuditChanged
    {
        public int IdOutbreak { get; set; }
        public int IdSequence { get; set; }
        public string CdEventType { get; set; }
        public string CdSubType { get; set; }
        public DateTime? DtEvent { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int IdKey { get; set; }
        public string DsDesc { get; set; }
        public int? IdEvent { get; set; }

        public Outbreak IdOutbreakNavigation { get; set; }
    }
}
