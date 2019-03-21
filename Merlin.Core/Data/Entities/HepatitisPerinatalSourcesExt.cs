using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HepatitisPerinatalSourcesExt
    {
        public int IdCase { get; set; }
        public string CdSource { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
