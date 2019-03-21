using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakLabSpecimen
    {
        public int IdLabSpecimen { get; set; }
        public int? IdLabOutbreak { get; set; }
        public DateTime? DtCollected { get; set; }
        public string NmWhoCollected { get; set; }
        public string DsCollectedType { get; set; }
        public string DsLocation { get; set; }
        public string CdTestType { get; set; }
        public DateTime? DtSpecimenSent { get; set; }
        public string NmWhoSpecimenSent { get; set; }
        public string DsWhereSpecimenSent { get; set; }
        public string CdLabStatus { get; set; }
        public DateTime? DtLabStatus { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? IdOutbreak { get; set; }
        public int? IdSequence { get; set; }
        public string DsAccession { get; set; }
        public string CdCounty { get; set; }

        public OutbreakLabResults IdLabOutbreakNavigation { get; set; }
        public Outbreak IdOutbreakNavigation { get; set; }
    }
}
