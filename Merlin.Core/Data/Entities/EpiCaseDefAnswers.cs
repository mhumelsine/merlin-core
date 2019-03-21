using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseDefAnswers
    {
        public int IdCase { get; set; }
        public int IdCaseDefItem { get; set; }
        public string DsAnswer { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
