using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AnimalOwner
    {
        public int IdOwner { get; set; }
        public string NmLast { get; set; }
        public string NmFirst { get; set; }
        public string DsAddr1Name { get; set; }
        public string DsAddr2Name { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string DsPhone { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
