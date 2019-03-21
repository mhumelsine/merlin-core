using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Specimen
    {
        public int IdSpecimen { get; set; }
        public int IdProfile { get; set; }
        public string CdSpecimen { get; set; }
        public string CdSpecimenStatus { get; set; }
        public string DsIdentifier { get; set; }
        public DateTime? DtCollected { get; set; }
        public int? IdLab { get; set; }
        public string DsAccession { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdIcd9 { get; set; }
        public string DsNotes { get; set; }
        public int? IdArea { get; set; }

        public EpiProfile IdProfileNavigation { get; set; }
    }
}
