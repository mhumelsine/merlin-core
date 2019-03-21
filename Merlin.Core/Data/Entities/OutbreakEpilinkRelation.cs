using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakEpilinkRelation
    {
        public int IdOutbreak { get; set; }
        public int IdPrimary { get; set; }
        public int IdLabElec { get; set; }
        public string CdEpilinkReason { get; set; }
    }
}
