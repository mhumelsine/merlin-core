using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int IdEntity { get; set; }
        public byte IdType { get; set; }
        public int? IdProfile { get; set; }
        public string DsComment { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public EpiProfile IdProfileNavigation { get; set; }
    }
}
