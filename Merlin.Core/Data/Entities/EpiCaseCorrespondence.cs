using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseCorrespondence
    {
        public int IdCorrespondence { get; set; }
        public int IdCase { get; set; }
        public string CdType { get; set; }
        public DateTime DtCorrespondence { get; set; }
        public string DsComments { get; set; }
        public string InClearTask { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? IdProfile { get; set; }
        public int? IdLab { get; set; }
    }
}
