using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class FuzzyMatchLogEntry
    {
        public int Id { get; set; }
        public int IdFuzzyMatchLog { get; set; }
        public string NmFirstIncoming { get; set; }
        public string NmFirstMatched { get; set; }
        public string NmLastIncoming { get; set; }
        public string NmLastMatched { get; set; }
        public DateTime? DtBirthIncoming { get; set; }
        public DateTime? DtBirthMatched { get; set; }
        public int? IdProfileMatched { get; set; }
        public bool? InWasChosen { get; set; }
        public int AmEditDistance { get; set; }

        public FuzzyMatchLog IdFuzzyMatchLogNavigation { get; set; }
    }
}
