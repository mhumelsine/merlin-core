using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Identifier
    {
        public int IdEntity { get; set; }
        public byte IdType { get; set; }
        public string IdSsnTemp { get; set; }
        public long? IdLookup { get; set; }
        public byte[] DsEnc { get; set; }
        public bool? IsValid { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }
    }
}
