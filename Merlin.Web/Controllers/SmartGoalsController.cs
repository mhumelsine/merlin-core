using Merlin.Core.Data.DataContexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Isf.Core.Utils;
using Merlin.Core.SmartGoals.Queries;
using Merlin.Core.SmartGoals.Dtos;
using Merlin.Core.SmartGoals.Services;
using Merlin.Data.Services;
using Dapper;
using System.Data;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SmartGoalsController : Controller
    {

        private readonly MerlinReadStore readStore;
        private readonly MerlinReadContext readContext;
        private readonly SmartGoalsRepository repos;
        private readonly IUsernameProvider usernameProvider;


        public SmartGoalsController(
            MerlinReadStore readStore,
            MerlinReadContext readContext,
            SmartGoalsRepository smartGoalsRepository,
            IUsernameProvider usernameProvider
            )
        {
            this.readStore = readStore;
            this.readContext = readContext;
            this.repos = smartGoalsRepository;
            this.usernameProvider = usernameProvider;
        }


        [HttpGet("user-search")]
        public async Task<IActionResult> GetUsers()
        {
            var results = await readContext.EpiUser
                .Where(w => w.UserRole.Any())
                .Select(s => new
                {
                    Id = s.IdUser,
                    Value = s.NmFirstUser + " " + s.NmLastUser
                })
                .OrderBy(o => o.Value)
                .ToListAsync();

            return Ok(results);
        }

        [HttpGet("last-quarter")]
        public object GetLastQuarter()
        {
            //MerlinPrincipal currentUser = (MerlinPrincipal)User;
            DateTime startDate, endDate;

            //var individualUser = this._userService.GetUserByUsername(currentUser.UserId);

            var today = DateTime.Today;

            var currentQuarter = ((today.Month - 1) / 3) + 1;

            var startDictionary = new Dictionary<int, DateTime> {
                { 1, new DateTime(today.Year, 1, 1) },
                { 2, new DateTime(today.Year, 4, 1) },
                { 3, new DateTime(today.Year, 7, 1) },
                { 4, new DateTime(today.Year, 10, 1) }
            };

            var endDictionary = new Dictionary<int, DateTime> {
                { 1, new DateTime(today.Year, 3, DateTime.DaysInMonth(today.Year, 3)) },
                { 2, new DateTime(today.Year, 6, DateTime.DaysInMonth(today.Year, 6)) },
                { 3, new DateTime(today.Year, 9, DateTime.DaysInMonth(today.Year, 9)) },
                { 4, new DateTime(today.Year, 12, DateTime.DaysInMonth(today.Year, 12)) }
            };

            // Initial filter is set to the previous completed quarter
            switch (currentQuarter)
            {
                case 1:
                    startDate = startDictionary[4].AddYears(-1);
                    endDate = endDictionary[4].AddYears(-1);
                    break;
                case 2:
                    startDate = startDictionary[1];
                    endDate = endDictionary[1];
                    break;
                case 3:
                    startDate = startDictionary[2];
                    endDate = endDictionary[2];
                    break;
                case 4:
                    startDate = startDictionary[3];
                    endDate = endDictionary[3];
                    break;
                default:
                    startDate = startDictionary[currentQuarter];
                    endDate = endDictionary[currentQuarter];
                    break;
            }


            var results = new
            {
                startDate,
                endDate
            };

            return results;
        }
        [HttpPost("results")]
        public async Task<IActionResult> GetSmartGoalsResults([FromBody] GetSmartGoalsResults command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var connection = readContext.Database.GetDbConnection().EnsureOpen();

            var  results = await connection.QueryAsync<SmartGoalsResultsDto>("spSmartGoals",
                            new
                            {
                                ID_User = command.User,
                                command.StartDate,
                                command.EndDate
                            },
                            commandType: CommandType.StoredProcedure);

            return Ok(results);
        }
    }
}