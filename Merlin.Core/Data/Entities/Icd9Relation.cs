using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Icd9Relation
    {
        public string CdIcd9 { get; set; }
        public string CdType { get; set; }
        public string DsRelation { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public int? IdPriority { get; set; }
        public string InPrimary { get; set; }

        public Icd9 CdIcd9Navigation { get; set; }
    }
}
