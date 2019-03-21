using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class ReadOnlyReadHandler : SurveyReadHandler
    {
        public ReadOnlyReadHandler(string key) : base (key)
        {

        }
        protected override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            context.SetAnswer(string.Empty);

            return Task.CompletedTask;
        }
    }
}
