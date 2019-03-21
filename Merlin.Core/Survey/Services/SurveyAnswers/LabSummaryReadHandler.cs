using Merlin.Core.Lab.Dtos;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    class LabSummaryReadHandler : SurveyReadHandler
    {
        public LabSummaryReadHandler()
            : base("Lab Summary")
        {

        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync($"api/case/{context.CaseId}/labsummary");
                response.EnsureSuccessStatusCode();

                var labs = response.Content.ReadAsAsync<LabSummaryDto>();

                context.SetAnswer(labs);
            }
        }
    }
}
