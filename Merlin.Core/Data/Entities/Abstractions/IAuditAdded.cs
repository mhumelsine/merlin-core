using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
    public interface IAuditAdded
    {
        string IdAdded { get; set; }
        DateTime DtAdded { get; set; }
    }
}
