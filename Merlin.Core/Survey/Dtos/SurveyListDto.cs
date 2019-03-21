using System;

namespace Merlin.Core.Survey.Dtos
{
    public class SurveyListDto
    {
        public string  SurveyName { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public string Icd9 { get; set; }
        public int? OutbreakId { get; set; }
        public string DiseaseName { get; set; }
        public string OutbreakName { get; set; }
    }
}
