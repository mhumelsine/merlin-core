using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EmailQueueHistory
    {
        public int IdEmailHistory { get; set; }
        public string DsEmailRecipient { get; set; }
        public string DsEmailText { get; set; }
        public DateTime? DtAdded { get; set; }
    }
}
