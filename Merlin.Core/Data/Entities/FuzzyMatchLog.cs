using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class FuzzyMatchLog
    {
        public FuzzyMatchLog()
        {
            FuzzyMatchLogEntry = new HashSet<FuzzyMatchLogEntry>();
        }

        public int Id { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public ICollection<FuzzyMatchLogEntry> FuzzyMatchLogEntry { get; set; }
    }
}
