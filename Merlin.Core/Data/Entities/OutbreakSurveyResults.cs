using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakSurveyResults
    {
        public int IdOutbreak { get; set; }
        public int IdSequence { get; set; }
        public int IdQuestion { get; set; }
        public string DsAnswer { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
    }
}
