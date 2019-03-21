using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Icd9Measures
    {
        public int IdIcd9MeasuresSet { get; set; }
        public string CdIcd9 { get; set; }
        public string CdType { get; set; }
        public DateTime DtEffective { get; set; }
        public int? IdOrder { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InRecommended { get; set; }
    }
}
