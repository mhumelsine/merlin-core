using Isf.Core.Utils;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class RepeaterWriteHandler : DefaultWriteHandler
    {
        protected override bool CanHandle(SurveyAnswerWriteContext context)
        {
            return context.Delta.Key.StartsWith("RG-", StringComparison.OrdinalIgnoreCase);
        }

        protected async override Task HandleInnerAsync(SurveyAnswerWriteContext context)
        {
            int index = 0;
            foreach (var answers in context.Delta.Incoming as IEnumerable)
            {
                foreach (JProperty answer in answers as IEnumerable)
                {
                    if (index == 0)
                    {
                        await DeleteAnswer(context, answer.Name.ToUpper());
                    }
                    await InsertAnswer(context, answer.Value.ToString(), answer.Name.ToUpper(), index);
                }
                index++;
                //if this becomes slow we can do in parallel
                //await InsertAnswer(context, answer);
            }
        }
    }
}
