using Isf.Core.Web.Validation;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Survey.Commands;
using Merlin.Core.Survey.Dtos;
using Merlin.Core.Survey.Rules;
using Merlin.Core.Survey.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Route("api/survey/question/{questionId}[controller]")]
    [ApiController]
    public class ObjectMappingController : Controller
    {
        private readonly ObjectMappingRules rules;
        private readonly ObjectMappingService service;
        private readonly MerlinReadContext readContext;

        public ObjectMappingController(ObjectMappingRules rules, ObjectMappingService service, MerlinReadContext readContext)
        {
            this.rules = rules;
            this.service = service;
            this.readContext = readContext;
        }

        [HttpGet("mapping/mappingUID")]
        public async Task<IActionResult> GetMappingsForQuestion([FromRoute]Guid mappingUID)
        {
            var mapping = await readContext.SurveyObjectMapping
                .FindAsync(mappingUID);

            if (mapping == null)
            {
                return NotFound($"Object Mapping with UID '{mappingUID}' was not found");
            }

            return Ok(mapping);
        }

        [HttpGet("mapping")]
        public async Task<IActionResult> GetMappingsForQuestion([FromRoute]string questionId)
        {
            var mappings = await readContext.SurveyObjectMapping
                .Where(mapping => mapping.IdQuestion == questionId)
                .Select(mapping => new
                {
                    MappingType = mapping.CdMappingtype,
                    MappingValue = mapping.NmMapvalue,
                    QuestionId = mapping.IdQuestion,
                })
                .ToListAsync();

            return Ok(mappings);
        }

        [HttpPost("mapping")]
        public async Task<IActionResult> PostMappingAsync([FromBody]CreateObjectMapping command)
        {
            await rules
                .NoDuplicateMapping()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            var uri = Url.Action("Get", new
            {
                questionId = command.QuestionId,
                mappingType = command.MappingType
            });

            return Created(uri, command);
        }
        [HttpPut("mapping")]
        public async Task<IActionResult> PutMappingAsync([FromBody]UpdateObjectMapping command)
        {
            await rules
                .NoDuplicateMapping()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            return Ok();
        }

        [HttpDelete("mapping")]
        public async Task<IActionResult> DeleteMappingAsync([FromBody]DeleteObjectMapping command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            return Ok();
        }
    }
}
