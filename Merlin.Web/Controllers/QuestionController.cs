using Isf.Core.Data;
using Isf.Core.Web.Validation;
using Merlin.Core.Codes.Services;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Survey.Commands;
using Merlin.Core.Survey.Dtos;
using Merlin.Core.Survey.Queries;
using Merlin.Core.Survey.Rules;
using Merlin.Core.Survey.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Route("api/survey/[controller]")]
    [ApiController]
    public class QuestionController : Controller
    {
        private readonly MerlinReadContext readContext;
        private readonly CodeRepository codes;
        private readonly QuestionService service;
        private readonly QuestionRules rules;

        public QuestionController(MerlinReadContext readContext, CodeRepository codes, QuestionService service, QuestionRules rules)
        {
            this.readContext = readContext;
            this.codes = codes;
            this.service = service;
            this.rules = rules;
        }

        [HttpGet("{questionId}")]
        public async Task<IActionResult> GetQuestionAsync([FromRoute]string questionId)
        {
            var question = await readContext.SurveyQuestionBank
                                .FindAsync(questionId);

            if (question == null)
            {
                return NotFound();
            }

            var dto = new QuestionDto
            {
                UID = question.UID,
                QuestionId = question.IdQuestion,
                QuestionText = question.DsQuestion,
                CodeType = question.CdCodeType,
                QuestionType = question.CdQuestionType,
                SaveToBank = question.InBankQuestion,
                HasBeenAnswered = question.InAnswered
            };

            if (!string.IsNullOrWhiteSpace(question.CdCodeType))
            {
                dto.Choices = await codes.GetCodes(question.CdCodeType);
            }

            return Ok(dto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery]GetQuestionsBySubText query)
        {
            var questionList = await readContext.SurveyQuestionBank
                    .Where(question => question.DsQuestion.Contains(query.SubText) && question.InBankQuestion)
                    .Select(question => new QuestionDto
                    {
                        QuestionId = question.IdQuestion,
                        CodeType = question.CdCodeType,
                        QuestionType = question.CdQuestionType,
                        QuestionText = question.DsQuestion,
                        HasBeenAnswered = question.InAnswered
                    })
                    .ToPagedListAsync(query.Paging);

            //load codes for each question
            foreach (var question in questionList.List)
            {
                if (!string.IsNullOrWhiteSpace(question.CodeType))
                {
                    question.Choices = await codes.GetCodes(question.CodeType);
                }
            }

            return Ok(questionList);
        }

        [HttpGet("{questionId}/layouts/{page:int}")]
        public async Task<IActionResult> GetLayoutsWithQuestionAsync([FromRoute]GetLayoutsReferencingQuestion query)
        {
            var results = await readContext.SurveyLayout
                .Where(layout => layout.SurveyLayoutQuestion
                    .Any(question => question.IdQuestion == query.QuestionId))
                .Select(layout => new LayoutListDto
                {
                    LayoutId = layout.UID,
                    LayoutName = layout.NmLayout,
                    Tags = layout.SurveyLayoutTag
                        .Select(tag => tag.DsTag)
                        .ToList()
                })

                .ToPagedListAsync(query.Paging);

            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> PostQuestionAsync([FromBody]CreateQuestion command)
        {
            await rules
                .NoDuplicateQuestionText()               
                .Apply(command, ModelState);

            command.UserId = User.Identity.Name;

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           var createdQuestionId = await service.Execute(command);

            var uri = Url.Action("Get", new { id = createdQuestionId });

            return Created(uri, new QuestionDto
            {
                QuestionId = createdQuestionId,
                QuestionText = command.QuestionText,
                CodeType = command.CodeType,
                QuestionType = command.QuestionType,
                SaveToBank = command.SaveToBank,
                HasBeenAnswered = command.HasBeenAnswered,
            });
        }

        [HttpPut]
        public async Task<IActionResult> PutQuestionAsync([FromBody]UpdateQuestion command)
        {
            await rules
                .NoDuplicateQuestionText()
                .QuestionMustNotBeAnswered()
                .Apply(command, ModelState);

            command.UserId = User.Identity.Name;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);
            return Ok();
        }


    }
}
