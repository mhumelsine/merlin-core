using Isf.Core.Cqrs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
    public class MessageQueue : AggregateRoot
    {
        public string Message { get; set; }

        public MessageQueue()
        {

        }

        public MessageQueue(string message)
        {
            Message = message;
            UID = Guid.NewGuid();
        }
    }
}
