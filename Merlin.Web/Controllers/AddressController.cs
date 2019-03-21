using Merlin.Core.Address.Dtos;
using Merlin.Core.Data.DataContexts;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Produces("application/json")]
    [Route("api/Address")]
    public class AddressController : Controller
    {
        private readonly MerlinReadStore readStore;

        public AddressController(MerlinReadStore readStore)
        {
            this.readStore = readStore;
        }

        [HttpGet("{zip:minlength(5)}")]
        public async Task<IActionResult> GetByZipCode([FromRoute]string zip)
        {
            //this is not correct, we should not be choosing a single zip for anyone
            string sql =
            $@"SELECT 
	            zip,
                c.CD_COUNTY as county,
                state,
                PO_NAME as City
            FROM ELR.dbo.GDT_POSTAL_BOUNDARY p
            left join merlin.dbo.county c
            on c.nm_name = p.county
            WHERE zip like @zip";

            var addresses = await readStore.QueryAsync<AddressDto>(sql, new { zip = $"{zip}%" });

            return Ok(addresses);
        }
    }
}
