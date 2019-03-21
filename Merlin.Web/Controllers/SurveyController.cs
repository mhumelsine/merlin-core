using System;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Isf.Core.Web.Validation;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Survey.Commands;
using Merlin.Core.Survey.Dtos;
using Merlin.Core.Survey.Queries;
using Merlin.Core.Survey.Rules;
using Merlin.Core.Survey.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SurveyController : Controller
    {
        private readonly MerlinReadContext readContext;
        private readonly LayoutRepository layoutRepository;
        private readonly SurveyService service;
        private readonly SurveyRules rules;
        private readonly SurveyAnswerRules answerRules;
        private readonly MerlinReadStore readStore;
        private readonly SurveyAnswerRepository surveyAnswerRepository;

        public SurveyController(
            MerlinReadContext readContext,
            LayoutRepository layoutRepository,
            SurveyService service,
            SurveyRules rules,
            SurveyAnswerRules answerRules,
            MerlinReadStore readStore,
            SurveyAnswerRepository surveyAnswerRepository)
        {
            this.readContext = readContext;
            this.layoutRepository = layoutRepository;
            this.service = service;
            this.rules = rules;
            this.answerRules = answerRules;
            this.readStore = readStore;
            this.surveyAnswerRepository = surveyAnswerRepository;
        }
        #region Survey
        [HttpPost("attach")]
        public async Task<IActionResult> PostAttachSurveysAsync([FromBody]AttachSurveys command)
        {
            await rules
                .MustBeValidLayoutId()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            //really should return a 201 created, but we have no API for getting the survey object yet
            return Ok();
        }

        [HttpGet("{surveyId}/answers/case/{caseId:int}")]
        public async Task<IActionResult> GetAnswersForCaseAsync([FromRoute]GetSurveyAnswers query)
        {

            var currentAnswers = await surveyAnswerRepository.Get(query);

            return Ok(currentAnswers);

        }

        [HttpGet("{surveyId}/answers/outbreak/{outbreakId:int}")]
        [ResponseCache(CacheProfileName = "Never")]
        public async Task<IActionResult> GetAnswersForOutbreakAsync([FromRoute]GetSurveyAnswers query)
        {

            var currentAnswers = await surveyAnswerRepository.Get(query);

            return Ok(currentAnswers);

        }

        [HttpGet("{surveyId}")]
        public async Task<IActionResult> GetLayout([FromRoute]GetSurveyWithLayout query)
        {
            var guid = await readContext.Survey
                .Where(survey => survey.UID == query.SurveyId)
                .Select(survey => survey.UidLayout)
                .FirstOrDefaultAsync();

            if (!guid.HasValue)
            {
                throw new InvalidOperationException(
                    $"Survey with UID '{query.SurveyId}' does not have an associated layout");
            }

            var layout = await layoutRepository.GetLayoutById(guid);

            return Ok(layout);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync([FromQuery]GetSurveys query)
        {
            dynamic param = new ExpandoObject();

            var sql = @"select 
                        s.Id_Survey SurveyIdNumber,
	                    s.UID_SURVEY SurveyId,
	                    nm_survey Name, 
	                    cd_survey_type SurveyType, 
	                    s.cd_icd9 ICD9, 
	                    s.id_outbreak OutbreakId,
	                    'Outbreak ' + cast(o.ID_OUTBREAK as varchar(25)) + ' - ' + oicd9.NM_ICD9 + ' - ' + oicd9.CD_ICD9 + ' / ' + o.NM_OUTBREAK as OutbreakDescription,
	                    CONVERT(VARCHAR(10), s.dt_effective, 101) EffectiveDate, 
	                    CAST(s.UID_SURVEY AS VARCHAR(100)) 
	                    + '-' +
	                    l.nm_layout as LayoutDescription, 
	                    i.nm_icd9 Icd9Description,
                        l.uid_layout LayoutId
                    from dbo.survey s 
                    left join dbo.ICD9 as i 
                    on s.cd_icd9 = i.CD_ICD9 
                    left join dbo.SURVEY_LAYOUT as l 
                    on s.UID_LAYOUT = l.UID_layout 
                    left join outbreak o
                    on s.id_outbreak = o.id_outbreak
                    left join dbo.icd9 oicd9
                    on o.CD_ICD9 = oicd9.CD_ICD9";

            var builder = new StringBuilder(
               $"{sql} where 1=1 and l.UID_LAYOUT IS NOT NULL and l.UID_LAYOUT <> '00000000-0000-0000-0000-000000000000' ");

            builder.Append(" and s.ID_SURVEY in (SELECT " +
                               "MAX(ID_SURVEY) as ID_SURVEY " +
                               "FROM SURVEY " +
                               "WHERE CAST([DT_EFFECTIVE] as Date) < CAST(GETDATE() as DATE) " +
                               "GROUP BY[CD_SURVEY_TYPE], [CD_ICD9], [ID_OUTBREAK])");

            if (!string.IsNullOrWhiteSpace(query.name))
            {
                builder.Append(" and nm_survey like '%'+@name+'%'");
                param.name = query.name;
            }

            if (!string.IsNullOrWhiteSpace(query.icd9))
            {
                builder.Append(" and s.cd_icd9 = @icd9");
                param.icd9 = query.icd9;
            }

            if (query.surveyTypes != null && query.surveyTypes.Any())
            {
                builder.Append(" and cd_survey_type in @surveyTypes");
                param.surveyTypes = query.surveyTypes;
            }

            query.OrderBy = "s.dt_effective desc";
            query.PageSize = 10;

            var results = await readStore.PagedQueryAsync<SurveyDTO>(
                builder.ToString(),
                param,
                query.Paging);


            return Ok(results);
        }

        [HttpPost("{surveyId}/answers")]
        public async Task<IActionResult> PostAnswersAsync([FromBody]SaveSurveyAnswers command)
        {
            await answerRules
                .AnswersAreCorrect()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            await service.Execute(command);

            return Ok();

            //throw new NotImplementedException();
        }
        #endregion



    }
}