using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class MeningitisExtNeisseria
    {
        public int IdCase { get; set; }
        public string InSentToStateLab { get; set; }
        public string CdSerogroup { get; set; }
        public string DsSerogroupOther { get; set; }
        public string InSulfa { get; set; }
        public string InRifampin { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
