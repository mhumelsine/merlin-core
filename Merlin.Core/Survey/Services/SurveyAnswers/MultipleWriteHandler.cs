using Isf.Core.Utils;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class MultipleWriteHandler : DefaultWriteHandler
    {
        protected override bool CanHandle(SurveyAnswerWriteContext context)
        {
            return SurveyAnswerBindingHelpers.HasMultipleAnswers(context.Delta.Incoming);
        }

        protected async override Task HandleInnerAsync(SurveyAnswerWriteContext context)
        {
            await DeleteAnswer(context);

            foreach (var answer in context.Delta.Incoming as IEnumerable)
            {
                //if this becomes slow we can do in parallel
                await InsertAnswer(context, answer);
            }
        }
    }
}
