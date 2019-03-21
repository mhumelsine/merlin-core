using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakPeopleLabJunk
    {
        public int IdOutbreak { get; set; }
        public int IdPeople { get; set; }
        public int IdLabTest { get; set; }
        public string InAnswer { get; set; }
        public DateTime? DtCollected { get; set; }
        public DateTime? DtReported { get; set; }
    }
}
