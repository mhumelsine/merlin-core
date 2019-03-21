using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SalmonellaContactExt
    {
        public int IdCase { get; set; }
        public int IdContact { get; set; }
        public string NmLast { get; set; }
        public string NmFirst { get; set; }
        public string DsAddr1 { get; set; }
        public string DsAddr2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string DsPhone { get; set; }
        public DateTime? DtBirth { get; set; }
        public string CdGenderContact { get; set; }
        public string CdRaceContact { get; set; }
        public string CdEthnicityContact { get; set; }
        public string CdContactType { get; set; }
        public DateTime? DtContactStart { get; set; }
        public DateTime? DtContactEnd { get; set; }
        public string InSensitiveSituation { get; set; }
        public string InConfirmedCase { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsNotes { get; set; }
    }
}
