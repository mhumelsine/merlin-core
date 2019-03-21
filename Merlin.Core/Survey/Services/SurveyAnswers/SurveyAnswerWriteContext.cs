using Isf.Core.Cqrs;
using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Survey;
using Merlin.Core.Survey.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Merlin.Core.Survey.Services
{
    internal class SurveyAnswerWriteContext : SurveyAnswerReadContext
    {
        public IDbTransaction Transaction { get; set; }
        public SurveyAnswerDelta Delta { get; set; }
        public string UserId { get; set; }
        public DateTime Timestamp { get; set; }
        public new MerlinWriteContext DB { get; set; }
    }
}
