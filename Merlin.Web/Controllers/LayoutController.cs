using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Isf.Core.Data;
using Isf.Core.Web.Validation;
using Merlin.Core.Data;
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
    public class LayoutController : Controller
    {
        private readonly LayoutRules rules;
        private readonly LayoutService service;
        private readonly MerlinReadStore readStore;
        private readonly MerlinReadContext readContext;
        private readonly LayoutRepository layoutRepository;

        public LayoutController(LayoutRules rules, MerlinReadContext readContext, LayoutService service, MerlinReadStore readStore, LayoutRepository layoutRepository)
        {
            this.rules = rules;
            this.service = service;
            this.readContext = readContext;
            this.readStore = readStore;
            this.layoutRepository = layoutRepository;
        }

        [HttpGet("tags")]
        public async Task<IActionResult> GetDistinctTags()
        {
            var tags = await readContext.SurveyLayoutTag
                   .Select(tag => tag.DsTag)
                   .Distinct()
                   .ToListAsync();

            return Ok(tags);
        }
        [HttpGet]
        public async Task<IActionResult> GetLayoutsByTags([FromQuery]GetLayoutsByTags query)
        {
            int? count = null;

            IQueryable<SurveyLayout> dataSet = readContext.SurveyLayout.Where(x => !string.IsNullOrEmpty( x.NmLayout));

            //if blank tags skip
            if (query.Tags != null)
            {
                List<string> tagQueries = new List<string>();

                foreach (var tag in query.Tags)
                {
                    tagQueries.Add($"select UID_LAYOUT from dbo.SURVEY_LAYOUT_TAG where DS_TAG = '{tag.Replace("'", "''")}'");
                }

                var sql = string.Join(" intersect ", tagQueries);

                var layoutIds = await readStore.QueryAsync<Guid>(sql);

                dataSet = dataSet
                    .Where(layout => layoutIds.Contains(layout.UID));

                count = layoutIds.Count();
            }

            var layoutList = await dataSet
                .Select(layout => new LayoutListDto
                {
                    LayoutId = layout.UID,
                    LayoutName = layout.NmLayout,
                    Tags = layout.SurveyLayoutTag
                        .Select(t => t.DsTag)
                        .ToList(),
                    Surveys = layout.Surveys
                        .Select(survey => new SurveyListDto
                        {
                            SurveyName = survey.NmSurvey,
                            Icd9 = survey.CdIcd9,
                            OutbreakId = survey.IdOutbreak,
                            EffectiveDate = survey.DtEffective,
                            DiseaseName = readContext.Icd9.Where(x => x.CdIcd9.Equals(survey.CdIcd9)).Select(item => item.NmIcd9).FirstOrDefault(),
                            OutbreakName = readContext.Outbreak.Where(x => x.IdOutbreak.Equals(survey.IdOutbreak)).Select(item => item.NmOutbreak).FirstOrDefault()
                        })
                       .OrderByDescending(item => item.EffectiveDate).ToList()
                })
                .ToPagedListAsync(query.Paging, count ?? dataSet.Count());
            return Ok(layoutList);

        }

        [HttpGet("{LayoutId:Guid}")]
        [ResponseCache(Duration = 5, VaryByQueryKeys = new string[] { "LayoutId" })]
        public async Task<IActionResult> GetLayoutsById([FromRoute]Guid LayoutId)
        {
            var layout = await layoutRepository.GetLayoutById(LayoutId);
            return Ok(layout);
        }

        [HttpPost]
        public async Task<IActionResult> PostLayout([FromBody]CreateLayout command)
        {
            await rules
                .NoDuplicateLayoutName()
                .Apply(command, ModelState);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdLayoutId = await service.Execute(command);

            var uri = Url.Action("Get", new { id = createdLayoutId });

            return Created(uri, new LayoutDto
            {
                LayoutId = createdLayoutId,
                LayoutName = command.LayoutName,
                Tags = command.Tags.ToList(),
                Items = new List<LayoutItemDto>()
            });
        }

        [HttpPut]
        public async Task<IActionResult> PutLayout([FromBody]UpdateLayout command)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            return Ok();
        }


        [HttpDelete("{layoutUid}")]
        public async Task<IActionResult> DeleteLayout([FromRoute]DeleteLayout command)
        {
            await rules.LayoutCannotBeInUse()
                .Apply(command, ModelState);

            if (ModelState.IsValid)
            {
                await service.Execute(command);

                return Ok();
            }

            return BadRequest(ModelState);
        }


    }
}