using Isf.Core.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal abstract class SurveyReadHandler : COR<SurveyAnswerReadContext>
    {
        protected readonly string answerKey;

        public SurveyReadHandler(string answerKey)
        {
            this.answerKey = answerKey.ToUpper();
        }

        protected override bool CanHandle(SurveyAnswerReadContext context)
        {
            return String.Equals(context.CurrentKey, answerKey, StringComparison.OrdinalIgnoreCase);
        }
    }    
}
