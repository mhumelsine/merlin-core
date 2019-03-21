using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Queries
{
    public class GetSurveyWithLayout //: Query
    {
        public Guid SurveyId { get; set; }
        public int CaseId { get; set; }
    }
}
