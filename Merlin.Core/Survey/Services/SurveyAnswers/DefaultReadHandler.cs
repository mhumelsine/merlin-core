using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class DefaultReadHandler : SurveyReadHandler
    {
        public DefaultReadHandler()
            : base(string.Empty)
        {
        }

        protected override bool CanHandle(SurveyAnswerReadContext context)
        {
            return true; //this is the default handler; it takes whatever isn't handled by all other handlers
        }

        protected async override Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            //need to handle multi-select and check groups
            //go get the answer from survey answers where survey instance and question are the same
            var existingAnswers = await context.DB.SurveyAnswers
                .Where(answer => answer.IdQuestion == context.CurrentKey
                    && answer.IdSurveyInstance == context.SurveyInstanceId)
                .ToListAsync();

            if (context.IsSingle)
            {
                if (existingAnswers.Any())
                {
                    context.SetAnswer(existingAnswers[0].DsAnswer);
                }
            }
            else
            {
                var answers = existingAnswers
                    .Select(a => a.DsAnswer)
                    .ToList();
                context.SetAnswer(answers);
            }

        }
    }
}
