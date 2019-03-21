using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class QiAssessment
    {
        public int IdAssessment { get; set; }
        public int IdCriteria { get; set; }
        public string CdCounty { get; set; }
        public short? AmYear { get; set; }
        public short? AmMonth { get; set; }
        public DateTime? DtFrom { get; set; }
        public DateTime? DtTo { get; set; }
        public string CdOfficial { get; set; }
        public string CdQiType { get; set; }
        public decimal? AmQi { get; set; }
        public string CdPass { get; set; }
        public decimal? AmToNorm { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdAdded { get; set; }
        public decimal? AmScoreToPass { get; set; }
        public string CdQiSubtype { get; set; }
        public string CdPassTotal { get; set; }
    }
}
