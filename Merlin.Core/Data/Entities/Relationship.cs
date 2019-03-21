using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Relationship
    {
        public int IdCase { get; set; }
        public string CdRelType { get; set; }
        public int IdIdentifier { get; set; }
        public DateTime? DtRelEffective { get; set; }
        public DateTime? DtRelEnd { get; set; }
        public string DsComments { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
