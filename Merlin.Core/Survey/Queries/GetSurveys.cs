using Isf.Core.Cqrs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Queries
{
    public class GetSurveys : PagedQuery
    { 
            public string name { get; set; }
            public string icd9 { get; set; }
            public IEnumerable<string> surveyTypes { get; set; }
    }
}
