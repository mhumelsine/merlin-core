using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakContactRelation
    {
        public int IdOutbreak { get; set; }
        public int IdPrimary { get; set; }
        public int IdContact { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
    }
}
