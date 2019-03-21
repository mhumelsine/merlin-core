using Merlin.Core.Case;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class TravelHistoryReadHandler : SurveyReadHandler
    {
        public TravelHistoryReadHandler()
            : base("Travel History")
        {
        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync($"api/case/{context.CaseId}/travelhistory");
                response.EnsureSuccessStatusCode();

                var travelHistory = response.Content.ReadAsAsync<TravelHistoryDto>();

                context.SetAnswer(travelHistory);
            }
        }
    }
}
