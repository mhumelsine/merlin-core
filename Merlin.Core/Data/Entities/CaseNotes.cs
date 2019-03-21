using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseNotes
    {
        public int IdNote { get; set; }
        public int IdOrder { get; set; }
        public int? IdCase { get; set; }
        public string CdType { get; set; }
        public string DsNotes { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public int? IdOutbreak { get; set; }
        public int? IdSequence { get; set; }
        public int? IdLab { get; set; }
        public int? IdAnimalProfile { get; set; }
        public int? IdProfile { get; set; }
        public string CdIcd9 { get; set; }
        public string DsAuthor { get; set; }
        public int? IdElrObservation { get; set; }
        public string CdReason { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdDeleteReason { get; set; }
        public DateTime? DtCaseNote { get; set; }
        public string CdCorrType { get; set; }
        public int? IdElrOrder { get; set; }
        public string CdQualityReason { get; set; }
    }
}
