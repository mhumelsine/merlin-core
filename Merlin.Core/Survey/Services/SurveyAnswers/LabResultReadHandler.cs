using Merlin.Core.Lab.Dtos;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class LabResultReadHandler : SurveyReadHandler
    {
        public LabResultReadHandler()
            : base("Lab Results")
        {

        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync($"api/case/{context.CaseId}/labs");
                response.EnsureSuccessStatusCode();

                var labs = response.Content.ReadAsAsync<LabResultDto>();

                context.SetAnswer(labs);
            }
        }
    }
}
