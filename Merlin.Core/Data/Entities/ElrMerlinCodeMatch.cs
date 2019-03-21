using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrMerlinCodeMatch
    {
        public string DsSendingApplication { get; set; }
        public string CdType { get; set; }
        public string DsElrValue { get; set; }
        public string DsMerlinValue { get; set; }
        public int IdMerlinCodeMatch { get; set; }
    }
}
