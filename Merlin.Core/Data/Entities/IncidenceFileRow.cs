using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class IncidenceFileRow
    {
        public int Id { get; set; }
        public int IdFile { get; set; }
        public int? IdLrv { get; set; }
        public string IdStarhs { get; set; }
        public DateTime DtTested { get; set; }
        public string DsResult { get; set; }
        public string DsNumericResult { get; set; }
        public string DsStarhsLab { get; set; }
        public string DsMethod { get; set; }
        public string DsFacilityName { get; set; }
        public string DsAccession { get; set; }

        public IncidenceFile IdFileNavigation { get; set; }
        public LabResultValues IdLrvNavigation { get; set; }
    }
}
