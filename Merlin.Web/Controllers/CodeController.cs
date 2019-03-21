using System;
using System.Linq;
using System.Threading.Tasks;
using Isf.Core.Cqrs.Web;
using Isf.Core.Data;
using Merlin.Core.Codes.Dtos;
using Merlin.Core.Codes.Rules;
using Merlin.Core.Codes.Services;
using Merlin.Core.Data.DataContexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Produces("application/json")]
    [Route("api/Code")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CodeController : Controller
    {
        private readonly CodeRules rules;
        private readonly CodeRepository repos;
        private readonly MerlinReadContext readContext;
        private readonly MerlinReadStore readStore;

        public CodeController(CodeRules rules, CodeRepository repos, MerlinReadContext readContext, MerlinReadStore readStore)
        {
            this.rules = rules;
            this.repos = repos;
            this.readContext = readContext;
            this.readStore = readStore;
        }


        [HttpGet("{codeType}")]
        [ResponseCache(VaryByQueryKeys = new string[] { "codeType" }, Duration = 120)]
        public async Task<IActionResult> GetAsync([FromRoute]string codeType)
        {
            var codes = await repos.GetCodes(codeType);

            return Ok(codes);
        }

        [HttpGet("icd9/{icd9Code}")]
        [ResponseCache(VaryByQueryKeys = new string[] { "icd9Code" }, Duration = 120)]
        public async Task<IActionResult> GetICD9Async([FromRoute]string icd9Code)
        {
            var icd9 = await readContext.Icd9
                .Where(d => d.CdIcd9 == icd9Code)
                .FirstOrDefaultAsync();

            return Ok(icd9);
        }

        [HttpGet("settings/{settingType}")]
        [ResponseCache(VaryByQueryKeys = new string[] { "settingType" }, Duration = 120)]
        public async Task<IActionResult> GetSettingsAsync([FromRoute]string settingType)
        {
            string sql = @"SELECT   ID_RESOURCE_SETTING as Code,
                                    NM_SETTING as Description  
                           FROM     RESOURCE_SETTING 
                           WHERE    CD_SETTING = @Type 
                           ORDER BY Description ASC";

            var settingNames = await readStore.QueryAsync<DropdownCode>(sql, new
            {
                type = settingType
            });

            return Ok(settingNames);
        }

        [HttpGet("vaccines/{icd9Code}/{relationType}")]
        [ResponseCache(VaryByQueryKeys = new string[] { "icd9Code" }, Duration = 120)]
        public async Task<IActionResult> GetVaccinesAsync([FromRoute]string icd9Code, string relationType)
        {
            string sql = @"SELECT 
                            V.DS_CPT_CODE AS Code, 
                            V.DS_FLSHOTS_TYPE + ' - ' + V.DS_CPT_CODE AS Description
                            FROM ICD9_RELATION IR 
                            INNER JOIN VACCINES V ON V.DS_CPT_CODE = IR.DS_RELATION AND IR.CD_TYPE = @relationType
                            WHERE IR.CD_ICD9 = @icd9Code";

            var vaccines = await readStore.QueryAsync<DropdownCode>(sql, new
            {
                icd9Code,
                relationType
            });

            return Ok(vaccines);
        }
        
    }
}