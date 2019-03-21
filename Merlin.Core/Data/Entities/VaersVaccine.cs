using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class VaersVaccine
    {
        public int IdCase { get; set; }
        public string CdVaccineTime { get; set; }
        public string DsVaccineType { get; set; }
        public string DsManufacturer { get; set; }
        public string DsLotNumber { get; set; }
        public string DsSite { get; set; }
        public short? AmPrevDoseCount { get; set; }
        public DateTime? DtDose { get; set; }
        public int InKey { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
