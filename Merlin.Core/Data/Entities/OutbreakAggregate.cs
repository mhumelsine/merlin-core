using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakAggregate
    {
        public int IdAggregate { get; set; }
        public int IdOutbreak { get; set; }
        public string NmAggregate { get; set; }
        public string DsAggregate { get; set; }
        public int? AmCases { get; set; }
        public int? AmDxConfirmed { get; set; }
        public int? AmDxProbable { get; set; }
        public int? AmDxSuspect { get; set; }
        public int? AmPeople { get; set; }
        public int? AmHospitalized { get; set; }
        public int? AmDeaths { get; set; }
        public int? AmProphylaxed { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? AmExposed { get; set; }

        public Outbreak IdOutbreakNavigation { get; set; }
    }
}
