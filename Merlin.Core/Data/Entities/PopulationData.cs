using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PopulationData
    {
        public byte? CdCounty { get; set; }
        public short? AmYear { get; set; }
        public int? AmPopulation { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public int IdPopulation { get; set; }
        public string CdAgeBucket { get; set; }
        public string CdRace { get; set; }
        public string CdEthnicity { get; set; }
        public string CdGender { get; set; }
    }
}
