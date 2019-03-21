using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class TblFluActivityLevel
    {
        public int IdCounty { get; set; }
        public DateTime DtReported { get; set; }
        public short? AmYear { get; set; }
        public byte? AmWeek { get; set; }
        public DateTime? DtCreated { get; set; }
        public int IdKey { get; set; }
    }
}
