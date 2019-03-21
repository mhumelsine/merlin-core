using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Dtos
{
    public class SurveyDTO
    {
        public Guid SurveyId { get; set; }
        public string SurveyIdNumber { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string SurveyType { get; set; }
        public string Icd9 { get; set; }
        public string OutbreakDescription { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public int? OutbreakId { get; set; }
        public string LayoutDescription { get; set; }
        public string Icd9Description { get; set; }
        public Guid? LayoutId { get; set; }
    }
}
