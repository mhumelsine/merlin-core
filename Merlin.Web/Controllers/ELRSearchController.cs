using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Isf.Core.Data;
using Isf.Core.Web.Validation;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Elr.Services;
using Merlin.Core.ELRSearch.Commands;
using Merlin.Core.ELRSearch.Queries;
using Merlin.Core.ELRSearch.Rules;
using Merlin.Core.ELRSearch.Services;
using Merlin.Data.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Merlin.Core.ELRSearch.Dtos;
using Newtonsoft.Json;
using Merlin.Core.Codes.Dtos;
using System;


//needs to be named ELRSearchController
namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ELRSearchController : Controller
    {
        private readonly ElrReadStore readStore;
        private readonly ELRSearchRepository repos;
        private readonly ELRSearchService elrService;
        private readonly ELRSearchRules rules;
        private readonly MerlinReadContext readContext;
        private readonly ELRReadContext elrReadContext;

        public ELRSearchController(
            ElrReadStore readStore,
            ELRSearchRepository elrRepository,
            ELRSearchService elrService,
            ELRSearchRules elrSearchRules,
            MerlinReadContext readContext,
            ELRReadContext elrReadContext
            )
        {
            this.readStore = readStore;
            this.repos = elrRepository;
            this.elrService = elrService;
            this.rules = elrSearchRules;
            this.readContext = readContext;
            this.elrReadContext = elrReadContext;
        }

        [HttpGet("advanced-search")]
        public async Task<IActionResult> GetAdvancedSearch()
        {
            var results = await repos.GetElrColumns();

            return Ok(results);
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetSearch([FromBody]SearchElr query)
        {
            var columns = (await repos.GetElrColumns())
                .Select(info => info.FQColumnName)
                .ToList();

            await rules
                .MaxPageSize1000()
                .EnsureValidColumnName()
                .EnsureValidOperator()
                .Apply(query, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var builder = new StringBuilder($@"select top ({query.PageSize}) {string.Join(',', columns)},stuff((select ' ' + e.Note 
                from elrNote e
                where e.ObservationKey = elrObservation.ObservationKey
                order by NoteSequenceID 
                for xml path('')), 1, 1, '') [Notes]
                from elrRequest with (nolock)
                left join elrOrder with (nolock)
                on elrRequest.RequestKey = elrOrder.RequestKey
                left join elrObservation with (nolock)
                on elrOrder.OrderKey = elrObservation.OrderKey
                where 1=1 ");

            IDictionary<string, object> param = new ExpandoObject();

            //rules should have validated sql is safe
            foreach (var condition in query.Criteria)
            {
                //create the where clause
                builder.Append($"and {condition.Expression} ");

                //add the parameter
                param[condition.ParameterName] = condition.Value.Trim();
            }

            //most likely looking for the most recently received labs
            builder.Append("order by elrObservation.ObservationKey desc");

            string sql = builder.ToString();

            //count is way too slow for the size of elr database so we cannot use PageQuery here
            //var results = await readStore.PagedQueryAsync<dynamic>(sql, param, query.Paging);
            var connection = elrReadContext.Database.GetDbConnection().EnsureOpen();

            var results = await connection.QueryAsync(sql, param, commandTimeout: 180);
          

            return Ok(results);
        }

        [HttpPost("force-assignment")]
        public async Task<IActionResult> ForceAssignment([FromBody]ReprocessForceAssignment command)
        {
            await rules
                .MustNotHaveExistingPendingOutcome()
                .EnsureValidProfileId()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await elrService.Execute(command);

            return Ok();
        }

        [HttpPost("force-import")]
        public async Task<IActionResult> ForceImport([FromBody]ReprocessForceImport command)
        {
            await rules
                .MustNotHaveExistingPendingOutcome()
                .EnsureValidProfileId()
                .Apply(command, ModelState);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await elrService.Execute(command);

            return Ok();
        }

        [HttpPost("Refilter")]
        public async Task<IActionResult> ExecuteRefilter([FromBody] RefilterObservations command)
        {
            await elrService.Execute(command);

            return Ok();
        }

        [HttpGet("{observationKey:int}/has-filter")]
        public async Task<IActionResult> GetCanRefilter([FromRoute]int observationKey)
        {
            string sql =
                @"select f.if_exists
                from elr.dbo.elrObservation b
                inner join elr.dbo.elrOrder o
                on b.OrderKey = o.OrderKey
                inner join elr.dbo.elrRequest r
                on o.RequestKey = r.RequestKey
                cross apply(
                  select 
	                case when exists (
		                  select 1 
		                  from merlin.dbo.elr_filter_event
		                  where (cd_lab_provider = 'MASTER_FILTER' or CD_LAB_PROVIDER = r.SendingApplication)
		                  and (CD_LOINC = b.ObservationCode or CD_ALT_OBSERVATION = b.ObservationAlternateCode)
  
		                  union all

		                  select 1
		                  from merlin.dbo.LOINC_MASTER
		                  where CD_LOINC = b.ObservationCode
	                )
	                then 1
	                else 0
	                end if_exists
                ) f
                where ObservationKey = @observationKey";

            var exists = await readStore.QuerySingleAsync<int>(sql, new { observationKey });

            return Ok(exists == 1);
        }

        [HttpGet("{familyId:int}/assignment-history")]
        public async Task<IActionResult> GetAssignmentHistory(int familyId)
        {
            var history = await readContext.Assignment
                .Where(assignment => assignment.IdFamily == familyId)
                .OrderByDescending(assignment => assignment.Id)
                .Select(assignment => new
                {
                    assignment.Id,
                    DateAssigned = assignment.DtAssigned,
                    AssignedBy = assignment.IdAssigned,
                    AssignmentType = assignment.CdAssignment,
                    Action = assignment.CdAction,
                    Disposition = assignment.CdDisposition,
                    ResolvedOn = assignment.DtResolved,
                    ResolvedBy = assignment.IdResolved,
                    County = assignment.CdCounty,
                    Role = assignment.CdRoleAssigned
                })
                .ToListAsync();

            return Ok(history);
        }

        [HttpGet("{eventId:int}/filter-event")]
        public async Task<IActionResult> GetFilterEvent(int eventId)
        {
            var events = await readContext.ElrFilterEvent
                .Where(e => e.IdEvent == eventId)
                .Select(e => new
                {
                    Id = e.IdEvent,
                    Name = e.NmEvent,
                    Sequence = e.IdSequence,
                    SendingApp = e.CdLabProvider,
                    Loinc = e.CdLoinc,
                    Alternate = e.CdAltObservation,
                    Comments = e.DsComments,
                    ExpiredOn = e.DtExpire,
                    CreatedOn = e.DtAdded,
                    CreatedBy = e.IdAdded,
                    ModifiedOn = e.DtChanged,
                    ModifiedBy = e.IdChanged
                })
                .ToListAsync();

            return Ok(events);
        }

        [HttpGet("{eventId:int}/filter-outcome")]
        public async Task<IActionResult> GetFilterOutcome(int eventId)
        {
            var events = await readContext.ElrFilterOutcome
                .Where(e => e.IdEvent == eventId)
                .Select(e => new
                {
                    Column = e.CdUpdateColumn,
                    Value = e.DsUpdateValue
                })
                .ToListAsync();

            return Ok(events);
        }

        [HttpGet("{eventId:int}/filter-detail")]
        public async Task<IActionResult> GetFilterDetail(int eventId)
        {
            var events = await readContext.ElrFilterDetail
                .Where(e => e.IdEvent == eventId)
                .Select(e => new
                {
                    Column = e.CdTargetColumn,
                    Operator = e.CdOperand,
                    Value = e.DsTargetValue
                })
                .ToListAsync();

            return Ok(events);
        }

        [HttpGet("{resultCode}/snomed")]
        public async Task<IActionResult> GetSnomed(string resultCode)
        {
            var events = await readContext.Snomed
                .Where(e => e.CdSnomed == resultCode)
                .Select(e => new
                {
                    SNOMED = e.CdSnomed,
                    Description = e.DsSnomed,
                    Genus = e.DsGenus,
                    Species = e.CdSpecies + " - " + e.CdSubspecies,
                    ICD9 = e.CdIcd9,
                    DOI = e.InDoiflag,
                    Result = e.CdResult
                })
                .ToListAsync();

            return Ok(events);
        }       

        [HttpGet("{observationKey:int}/history")]
        public async Task<IActionResult> GetProcessingHistory(int observationKey)
        {
            var history = await readContext.ObservationCatalog
                .Where(catalog => catalog.IdElrObservation == observationKey)
                .OrderByDescending(catalog => catalog.IdCatalog)
                .Select(catalog => new
                {
                    ProcessedOn = catalog.DtAdded.ToString("MM/dd/yyyy hh:mm:ss.fff tt"),
                    ProcessedBy = catalog.IdAdded,
                    FamilyId = catalog.IdFamily,
                    Outcome = catalog.DsOutcomeNote,
                    ModifiedOn = catalog.DtChanged,
                    ModifiedBy = catalog.IdChanged,
                    Scenario = catalog.CdIcd9 == "HIV" ? //if HIV goto scenario table
                        readContext.Scenario
                            .Where(s => s.Id == catalog.IdAutoScenario)
                            .Select(s => s.CdType + " - " + s.DsName)
                            .FirstOrDefault()
                        : //else goto auto scenario table                 
                        readContext.AutoScenario
                            .Where(s => s.IdAutoScenario == catalog.IdAutoScenario)
                            .Select(s => s.NmAutoScenario + " - " + s.CdAutoScenario)
                            .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(history);
            ////want to add this later
            //var events = await readContext.Scenario
            //    .Where(s => s.Id == scenarioId)
            //    .Select(s => new
            //    {
            //        Name = s.DsName,
            //        Type = s.CdType,
            //        Priority = s.DsPriority                    
            //    })
            //    .ToListAsync();

            //return Ok(events);
        }

        [HttpGet("{observationCode}/loinc")]
        public async Task<IActionResult> GetLoincMaster(string observationCode)
        {
            var history = await readContext.LoincMaster
                .Where(master => master.CdLoinc == observationCode)
                .Select(master => new
                {
                    Code = master.CdLoinc,
                    Description = master.DsLoinc,
                    MerlinTestType = master.CdMerlinTestType,
                    Grouping = master.CdGrouping,
                    DOI = master.InDoiflag,
                    SpecimenType = master.CdSpecimen,
                    Methodology = master.CdMethodology,
                    EHARS = master.DsEHars,
                    CreatedOn = master.DtAdded,
                    CreatedBy = master.IdAdded
                })
                .ToListAsync();

            return Ok(history);
        }

        [HttpGet("{profileId:int}/profile")]
        public async Task<IActionResult> GetProfileDetails([FromRoute]GetProfileById query)
        {
            await rules
                .EnsureValidProfileId()
                .Apply(query, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var profile = await readContext.EpiProfile
                .FindAsync(query.ProfileId);

            return Ok(new
            {
                ProfileId = profile.IdProfile,
                Name = profile.NmFirst + " " + profile.NmLast
            });
        }

        [HttpGet("{stateno}/profiles")]
        public async Task<IActionResult> GetDetails([FromRoute]GetProfileByStateNo query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var profiles = await readContext.EpiProfile
                .Where(profile => profile.HivCase.Any(c => c.DsStateno == query.Stateno))
                .Select(profile => new
                {
                    ProfileId = profile.IdProfile,
                    Name = profile.NmFirst + " " + profile.NmLast
                })
                .ToListAsync();

            return Ok(profiles);
        }

        [ResponseCache(CacheProfileName = "Never")]
        [HttpGet("templates")]
        public async Task<IActionResult> GetTemplates()
        {
            var templates = await readContext.ElrSearchTemplates
               .Where(e => (e.IdAdded == User.Identity.Name || e.CdType == "MASTER"))
               .OrderBy(e => e.CdType)
               .Select(e => new DropdownCode
               {
                   Code = Convert.ToString(e.Id),
                   Description = e.DsName,

               }).ToListAsync();

            return Ok(templates);
        }

        [ResponseCache(CacheProfileName = "Never")]
        [HttpGet("template/{id:int}")]
        public async Task<IActionResult> GetTemplateDetails(int id)
        {
            var tempDtls = await readContext.ElrSearchTemplates
               .FindAsync(id);

            return Ok(new TemplateDetailsDto
            {
                TemplateName = tempDtls.DsName,
                TemplateID = tempDtls.Id,
                TemplateType = tempDtls.CdType,
                Criteria = JsonConvert.DeserializeObject<IList<SearchCriteria>>(tempDtls.JsData),
            });
        }

        [HttpPost("template")]
        public async Task<IActionResult> CreateTemplate([FromBody]CreateTemplate command)
        {
            await rules
                .NoDuplicateTemplateNames()
                .EnsureValidColumnName()
                .EnsureValidOperator()
                .Apply(command, ModelState);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await elrService.Execute(command);

            var uri = Url.Action("GetTemplateDetails", new { id });

            return Created(uri, new TemplateDetailsDto
            {
                TemplateID = id,
                TemplateName = command.TemplateName,
                TemplateType = command.TemplateType,
                Criteria = command.Criteria,
            });
        }

        [HttpPut("template")]
        public async Task<IActionResult> UpdateTemplate([FromBody]UpdateTemplate command)
        {
            await rules
                .NoDuplicateTemplateNames()
                .EnsureValidColumnName()
                .EnsureValidOperator()
                .Apply(command, ModelState);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await elrService.Execute(command);

            return Ok();
        }

        [HttpDelete("template/{id}")]
        public async Task<IActionResult> DeleteTemplate([FromRoute]DeleteTemplate command)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await elrService.Execute(command);

            return Ok();
        }
    }
}