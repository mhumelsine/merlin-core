using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseMeasuresArchive
    {
        public int IdCase { get; set; }
        public string CdType { get; set; }
        public DateTime? DtInitiated { get; set; }
        public string DsNotes { get; set; }
        public string CdInitiated { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
