using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyDisplay
    {
        public int IdSurveyDisplay { get; set; }
        public int IdQuestion { get; set; }
        public int? IdOrder { get; set; }
        public string DsQuestionLabel { get; set; }
        public DateTime? DtEffective { get; set; }
        public DateTime? DtExpired { get; set; }
        public int? AmX { get; set; }
        public int? AmY { get; set; }
        public int? AmWidth { get; set; }
        public int? AmHeight { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? IdSurvey { get; set; }
        public string DsHeader { get; set; }
        public string DsActivatedFrom { get; set; }
        public string DsMatchValues { get; set; }
    }
}
