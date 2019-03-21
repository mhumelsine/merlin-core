using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakStatistics
    {
        public int IdOutbreak { get; set; }
        public short? AmMinDuration { get; set; }
        public string CdMinIn { get; set; }
        public short? AmMaxDuration { get; set; }
        public string CdMaxIn { get; set; }
        public short? AmNbrPersonsIll { get; set; }
        public string DsNbrPersonsIll { get; set; }
        public short? AmExposed { get; set; }
        public string DsExposed { get; set; }
        public short? AmVaccinated { get; set; }
        public string DsVaccinated { get; set; }
        public short? AmSusceptible { get; set; }
        public string DsSusceptible { get; set; }
        public short? AmProphylaxed { get; set; }
        public short? AmHospitalized { get; set; }
        public short? AmDeaths { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
