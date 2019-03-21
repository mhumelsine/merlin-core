using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Icd9Symptom
    {
        public string CdIcd9 { get; set; }
        public string CdSymptom { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public Icd9 CdIcd9Navigation { get; set; }
        public Symptom CdSymptomNavigation { get; set; }
    }
}
