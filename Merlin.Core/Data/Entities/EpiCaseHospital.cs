using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseHospital
    {
        public int IdHospitalVisit { get; set; }
        public int? IdCase { get; set; }
        public int? IdHospital { get; set; }
        public DateTime? DtBegin { get; set; }
        public DateTime? DtEnd { get; set; }
        public string DsRoom { get; set; }
        public string DsComments { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdVisitType { get; set; }
        public string DsMedication { get; set; }
        public string DsXray { get; set; }
        public string InEmergencyVisit { get; set; }

        public Resource IdHospitalNavigation { get; set; }
    }
}
