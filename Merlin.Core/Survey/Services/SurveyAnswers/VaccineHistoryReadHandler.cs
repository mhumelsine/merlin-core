using Merlin.Core.Case;
using Merlin.Core.Case.Dtos;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    class VaccineHistoryReadHandler : SurveyReadHandler
    {
        public VaccineHistoryReadHandler()
            : base("Vaccination History")
        {

        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync($"api/case/{context.CaseId}/vaccinehistory");
                response.EnsureSuccessStatusCode();

                var vaccines = response.Content.ReadAsAsync<VaccineHistoryDto>();

                context.SetAnswer(vaccines);
            }
        }
    }
}
