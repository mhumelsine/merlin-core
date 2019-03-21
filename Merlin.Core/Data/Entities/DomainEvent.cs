using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public class DomainEvent
    {
        public long IdEvent { get; set; }
        public DateTime DtEvent { get; set; }
        public string NmEvent { get; set; }
        public string DsProcess { get; set; }
        public string IdUser { get; set; }
        public Guid UID { get; set; }
        public DomainEventData Data { get; set; }
    }

    public class DomainEventData
    {
        public long IdEvent { get; set; }
        public string JsEventData { get; set; }
    }
}
