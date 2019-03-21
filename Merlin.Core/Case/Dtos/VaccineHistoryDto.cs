using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Case.Dtos
{
    public class VaccineHistoryDto
    {
        public string VaccineType { get; set; }
        public string DateGiven { get; set; }
        public string Manufacturer { get; set; }
        public string LotNumber { get; set; }
        public string DoseNumber { get; set; }
        public int ProfileID { get; set; }
        public int CaseId { get; set; }
        public string Icd9 { get; set; }
        public int VaccineID { get; set; }
    }
}
