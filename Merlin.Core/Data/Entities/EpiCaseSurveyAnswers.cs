using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseSurveyAnswers
    {
        public int IdCase { get; set; }
        public int IdSequence { get; set; }
        public string InAnswer { get; set; }
        public string DsPromptInfo { get; set; }
        public string CdArea { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InActive { get; set; }
    }
}
