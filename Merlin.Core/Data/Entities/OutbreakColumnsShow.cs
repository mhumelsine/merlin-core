using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakColumnsShow
    {
        public int IdColumn { get; set; }
        public string NmColumn { get; set; }
        public string Description { get; set; }
        public string RealColumn { get; set; }
        public bool? InDefault { get; set; }
        public string CdType { get; set; }
        public string TableJoin { get; set; }
        public string ClnJoin { get; set; }
    }
}
