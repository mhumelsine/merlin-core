using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class QiMeasure
    {
        public int IdMeasure { get; set; }
        public DateTime? DtMeasure { get; set; }
        public string CdCounty { get; set; }
        public short? IdQiMeasure { get; set; }
        public string CdMeasureType { get; set; }
        public decimal? AmPoints { get; set; }
        public string DsComments { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }
        public bool? InAttended { get; set; }
        public int? AmAttendees { get; set; }
        public string DsMonitor { get; set; }
        public string NmMeasure { get; set; }
        public bool? InFollowup { get; set; }
        public string AmMeasureTime { get; set; }
    }
}
