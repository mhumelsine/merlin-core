using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakPeopleSymptoms
    {
        public int IdOutbreak { get; set; }
        public int IdSequence { get; set; }
        public string CdSymptoms { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
    }
}
