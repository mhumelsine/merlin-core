using Merlin.Core.Case;
using Merlin.Core.Case.Dtos;
using System.Net.Http;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class HealthCareVisitsReadHandler : SurveyReadHandler
    {
        public HealthCareVisitsReadHandler()
            : base("Health Care Visits")
        {

        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync($"api/case/{context.CaseId}/healthcarevisits");
                response.EnsureSuccessStatusCode();

                var visits = response.Content.ReadAsAsync<HealthCareVisitDto>();

                context.SetAnswer(visits);
            }
        }
    }
}
