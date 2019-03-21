using System;

namespace Merlin.Core.Survey.Queries
{
    public class GetSurveyAnswers
    {
        public Guid SurveyId { get; set; }
        public int? CaseId { get; set; }
        public int? OutbreakId { get; set; }
        public int? ProfileId { get; set; }
    }
}
