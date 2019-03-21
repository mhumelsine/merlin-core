using Isf.Core.Utils;
using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Data.Services;
using Merlin.Core.Survey.Dtos;
using Merlin.Core.Survey.Queries;
using Merlin.Data.Services;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    public class SurveyAnswerRepository
    {
        private readonly MerlinReadContext readContext;
        private readonly DataServices dataServices;

        public SurveyAnswerRepository(MerlinReadContext readContext, DataServices dataServices)
        {
            this.readContext = readContext;
            this.dataServices = dataServices;
        }

        public async Task<Dictionary<string, object>> Get(GetSurveyAnswers query)
        {
            //need to build a chain here
            var answerReader = COR<SurveyAnswerReadContext>.CreateChain(
                new EpiLinksReadHandler(),
                new HealthCareVisitsReadHandler(),
                new LabResultReadHandler(),
                new LabSummaryReadHandler(),
                new SymptomReadHandler(),
                new TravelHistoryReadHandler(),
                new MappedReadHandler(dataServices),
                new ReadOnlyReadHandler("Outbreak Lab List"),
                new RepeaterReadHandler(),
                new DefaultReadHandler());

            //need to build the AnswerDictionary
            var existingLayout = await readContext.SurveyLayout
                .FirstOrDefaultAsync(layout => layout.Surveys
                    .Any(survey => survey.UID == query.SurveyId));

            var items = JsonConvert.DeserializeObject<IList<LayoutItemDto>>(existingLayout.JsLayout)
                .GetAll("control", "question", "repeatingQuestionsGroup");

            var answers = new Dictionary<string, object>();

            foreach (var item in items)
            {
                if (item.QuestionType == QuestionType.Check)
                {
                    answers[item.Id.ToUpper()] = new List<string>();
                }
                else
                {
                    answers[item.Id.ToUpper()] = string.Empty;
                }
            }

            //need to get the survey instance ID
            var surveyInstanceId = await GetSurveyInstanceId(query.ProfileId, query.CaseId, query.OutbreakId);


            var handlingContext = new SurveyAnswerReadContext
            {
                DB = readContext,
                CaseId = query.CaseId,
                ProfileId = query.ProfileId,
                OutbreakId = query.OutbreakId,
                QuestionStorageMap = await GetQuestionStorageMap(query.SurveyId),
                SurveyInstanceId = surveyInstanceId.Value,
                Answers = answers
            };

            var connection = readContext.Database.GetDbConnection().EnsureOpen();

            handlingContext.Connection = connection;

            foreach (var item in items)
            {
                handlingContext.CurrentKey = item.Id.ToUpper();
                handlingContext.CurrentItem = item;
                await answerReader.HandleAsync(handlingContext);
            }

            return answers;
        }

        internal async Task<IDictionary<string, SurveyObjectMapping>> GetQuestionStorageMap(Guid surveyUID)
        {
            var layoutId = readContext.Survey
                .Where(survey => survey.UID == surveyUID)
                .Select(survey => survey.UidLayout)
                .First();

            var questionIds = await readContext.SurveyLayout
                .Where(layout => layout.UID == layoutId)
                .SelectMany(layout => layout.SurveyLayoutQuestion
                    .Select(question => question.IdQuestion))
                .ToListAsync();

            var storageMapping = await readContext.SurveyObjectMapping
                .Where(mapping => mapping.CdMappingtype == "TARGETDS")
                .Where(mapping => questionIds.Contains(mapping.IdQuestion))
                .ToDictionaryAsync(mapping => mapping.IdQuestion.ToUpper());

            return storageMapping;
        }

        internal async Task<int?> GetSurveyInstanceId(int? profileId, int? caseId, int? outbreakId)
        {
            var surveyInstanceId = await readContext.SurveyInstance
                .OrderByDescending(instance => instance.IdSurveyInstance)
                .Where(instance => (instance.IdEntity == caseId && instance.CdEntityType == "C")
                    || (instance.IdEntity == outbreakId && instance.CdEntityType == "O"))
                .Select(instance => instance.IdSurveyInstance)
                .FirstOrDefaultAsync();

            return surveyInstanceId;
        }
    }
}
