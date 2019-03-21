using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class DeployAreaSurvey
    {
        public int IdArea { get; set; }
        public int IdSurvey { get; set; }
        public string CdAreaSurveyType { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public DeployArea IdAreaNavigation { get; set; }
        public Survey IdSurveyNavigation { get; set; }
    }
}
