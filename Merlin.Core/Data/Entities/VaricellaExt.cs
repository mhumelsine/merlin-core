using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class VaricellaExt
    {
        public int IdCase { get; set; }
        public string CdHistVaccine { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdHistDisease { get; set; }
    }
}
