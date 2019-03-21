using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakTravel
    {
        public int IdOutbreak { get; set; }
        public int IdSequence { get; set; }
        public int IdTravelSeq { get; set; }
        public string DsCity { get; set; }
        public string DsCountry { get; set; }
        public DateTime? DtFrom { get; set; }
        public DateTime? DtTo { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
    }
}
