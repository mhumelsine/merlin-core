using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
    public interface IHaveUID
    {
        Guid UID { get; }
    }
}
