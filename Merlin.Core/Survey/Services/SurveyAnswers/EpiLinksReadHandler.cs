using Merlin.Core.Case;
using Merlin.Core.Case.Dtos;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class EpiLinksReadHandler : SurveyReadHandler
    {
        public EpiLinksReadHandler()
            : base("Epi-Link Relationships")
        {

        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync($"api/case/{context.CaseId}/epilinks");
                response.EnsureSuccessStatusCode();

                var epiLinks = response.Content.ReadAsAsync<EpiLinkDto>();

                context.SetAnswer(epiLinks);
            }
        }
    }
}
