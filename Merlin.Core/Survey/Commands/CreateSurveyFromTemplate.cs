using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Commands
{
    public class CreateSurveyFromTemplate
    {
        public int SurveyIdToClone { get; set; }
        public string SurveyType { get; set; }
        public int? OutbreakId { get; set; }
        public string SurveyName { get; set; }
        public DateTime EffectiveDate { get; set; }
    }
}
