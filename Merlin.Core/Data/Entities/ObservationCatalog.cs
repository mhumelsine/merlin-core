using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ObservationCatalog : IAuditAdded, IAuditChanged
    {
        public int IdCatalog { get; set; }
        public int? IdAlias { get; set; }
        public int? IdElrObservation { get; set; }
        public int? IdFamily { get; set; }
        public string DsAccession { get; set; }
        public int? IdLrv { get; set; }
        public string DsOutcomeNote { get; set; }
        public int? IdAutoScenario { get; set; }
        public string CdIcd9 { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }

        public Family IdFamilyNavigation { get; set; }
    }
}
