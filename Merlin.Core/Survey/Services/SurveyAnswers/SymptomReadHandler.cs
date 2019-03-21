using Merlin.Core.Case;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class SymptomReadHandler : SurveyReadHandler
    {
        public SymptomReadHandler(): base("symptoms")
        {

        }
        protected override async Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync($"api/case/{context.CaseId}/symptoms");
                response.EnsureSuccessStatusCode();

                var symptoms = response.Content.ReadAsAsync<CaseSymptomDto>();

                context.SetAnswer(symptoms);
            }
        }
    }
}
