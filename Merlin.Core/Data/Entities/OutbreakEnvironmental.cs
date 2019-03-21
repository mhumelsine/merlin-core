using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakEnvironmental
    {
        public int IdOutbreak { get; set; }
        public int IdSequence { get; set; }
        public int? IdSetting { get; set; }
        public short? AmQuantity { get; set; }
        public string DsTypeEnviron { get; set; }
        public string DsDescription { get; set; }
        public string DsAddress { get; set; }
        public string DsCity { get; set; }
        public string DsZip { get; set; }
        public string CdState { get; set; }
        public string CdCounty { get; set; }
        public string CdDispositionEnviron { get; set; }
        public DateTime? DtDisposition { get; set; }
        public string DsNote { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
