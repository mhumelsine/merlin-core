using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
    public interface IAuditChanged
    {
        string IdChanged { get; set; }
        DateTime? DtChanged { get; set; }
    }
}
