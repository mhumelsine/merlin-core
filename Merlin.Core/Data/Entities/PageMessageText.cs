using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PageMessageText
    {
        public string CdPage { get; set; }
        public string DsStyleClass { get; set; }
        public string CdLocation { get; set; }
        public string DsMessageText { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdIcd9 { get; set; }
        public int IdMessageTxt { get; set; }
        public string DsField { get; set; }
        public byte? IdSequence { get; set; }
        public bool? InActive { get; set; }
    }
}
