using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class IncidenceFile
    {
        public IncidenceFile()
        {
            IncidenceFileRow = new HashSet<IncidenceFileRow>();
        }

        public int Id { get; set; }
        public string DsStarhsFile { get; set; }
        public Guid IdStarhsChecksum { get; set; }
        public string DsLinkingFile { get; set; }
        public Guid IdLinkingChecksum { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public ICollection<IncidenceFileRow> IncidenceFileRow { get; set; }
    }
}
