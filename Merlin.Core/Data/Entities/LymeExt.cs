using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LymeExt
    {
        public int IdCase { get; set; }
        public string InDermatologic { get; set; }
        public string InRheumatologic { get; set; }
        public string InNeuroBells { get; set; }
        public string InNeuroRadic { get; set; }
        public string InNeuroLymph { get; set; }
        public string InNeuroEnceph { get; set; }
        public string InNeuroCsfTested { get; set; }
        public string InNeuroAntibody { get; set; }
        public string InCardiologic { get; set; }
        public string DsOtherClinical { get; set; }
        public string InHospitalized { get; set; }
        public string InPregnant { get; set; }
        public string NmAntibiotic { get; set; }
        public int? DsDaysOnAnti { get; set; }
        public string CdCountyExposed { get; set; }
        public string CdStateExposed { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdUpdated { get; set; }
        public DateTime? DtUpdated { get; set; }
        public string DsSeverity { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
