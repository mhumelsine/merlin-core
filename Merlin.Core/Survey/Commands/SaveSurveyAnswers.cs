using System;
using System.Collections.Generic;

namespace Merlin.Core.Survey.Commands
{
    public class SaveSurveyAnswers 
    {
        public IDictionary<string, object> Answers { get; set; }
        public int? CaseId { get; set; }
        public int? ProfileId { get; set; }
        public int? OutbreakId { get; set; }
        public Guid SurveyId { get; set; }
    }
}
