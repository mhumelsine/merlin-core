using Isf.Core.Utils;
using System;

namespace Merlin.Core.Survey.Services
{
    internal abstract class SurveyWriteHandler : COR<SurveyAnswerWriteContext>
    {
        private string key;

        public SurveyWriteHandler(string key)
        {
            this.key = key.ToUpper();
        }

        protected override bool CanHandle(SurveyAnswerWriteContext context)
        {
            return string.Equals(context.Delta.Key, key, StringComparison.OrdinalIgnoreCase);
        }
    }
}
