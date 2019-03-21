using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class WeekNumber
    {
        public short AmWeek { get; set; }
        public DateTime DtFrom { get; set; }
        public DateTime DtTo { get; set; }
        public short? AmYear { get; set; }
    }
}
