using Microsoft.EntityFrameworkCore;
using Merlin.Core.Survey.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Dynamic;

namespace Merlin.Core.Survey.Services
{
    internal class RepeaterReadHandler : SurveyReadHandler
    {
        public RepeaterReadHandler() : base("RG-")
        {

        }

        protected override bool CanHandle(SurveyAnswerReadContext context)
        {
            return context.CurrentKey.StartsWith(answerKey, StringComparison.OrdinalIgnoreCase);
        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            var questions = context.CurrentItem.Items.GetAll("question").
                Select(item => item.Id).
                ToList();

            var existingAnswers = await context.DB.SurveyAnswers
                .Where(answer => questions.Contains(answer.IdQuestion)
                    && answer.IdSurveyInstance == context.SurveyInstanceId).ToListAsync();

            int nRows = existingAnswers
                .Select(x => x.IdQuestionSub).Max() ?? 0;

            //var jArray = new List<object>();

            //for (int i= 0; i <= nRows; i++)
            //{
            //    dynamic jObject = new ExpandoObject();
            //    jObject.index = i;
            //    foreach (var question in questions)
            //    {
            //        string answer = existingAnswers
            //            .Where(x => x.IdQuestion == question && x.IdQuestionSub == i)
            //            .Select(x => x.DsAnswer)
            //            .FirstOrDefault();
            //        //JProperty jProp = new JProperty(question, answer);
            //        ((IDictionary <string, object>) jObject)[question] = answer;
            //    }
            //    jArray.Add(jObject);
            //}
            var jArray = new JArray();

            for (int i = 0; i <= nRows; i++)
            {
                dynamic jObject = new JObject();
                jObject.index = i;
                foreach (var question in questions)
                {
                    string answer = existingAnswers
                        .Where(x => x.IdQuestion == question && x.IdQuestionSub == i)
                        .Select(x => x.DsAnswer)
                        .FirstOrDefault();
                    jObject.Add(question, answer);
                }
                jArray.Add(jObject);
            }
            context.SetAnswer(jArray);

        }
    }
}
