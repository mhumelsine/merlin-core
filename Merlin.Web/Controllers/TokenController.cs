using System;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Isf.Core.Security;
using Isf.Core.Utils.Logging;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.EpiUser.Services;
using Merlin.Core.Utils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        private readonly JwtTokenFactory tokenFactory;
        private readonly AuthenticationService service;
        private readonly ILogger logger;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly IConfiguration config;
        private readonly MerlinReadContext readContext;

        public TokenController(
            JwtTokenFactory tokenFactory,
            AuthenticationService service,
            ILogger logger,
            IHttpContextAccessor httpContextAccessor,
            IHostingEnvironment hostingEnvironment,
            IConfiguration config,
            MerlinReadContext readContext)
        {
            this.tokenFactory = tokenFactory;
            this.service = service;
            this.logger = logger;
            this.httpContextAccessor = httpContextAccessor;
            this.hostingEnvironment = hostingEnvironment;
            this.config = config;
            this.readContext = readContext;
        }


        [HttpGet("{base64Url}")]
        [ResponseCache(CacheProfileName = "Never")]
        public async Task<IActionResult> GetToken([FromRoute]string base64Url)
        {
            var sessionId = httpContextAccessor.HttpContext.Request.Cookies[config["Jwt:MerlinSessionKey"]];
            string userId = null;

            try
            {
                if (hostingEnvironment.IsDevelopment())
                {
                    userId = "STU";
                }
                else
                {
                    //need to use single; if more than one user has the same session ID, we should not log them in and throw exception
                    userId = await readContext.EpiUser
                        .Where(user => user.IdSession == sessionId && user.DsLoggedIn == "1")
                        .Select(user => user.IdUser)
                        .SingleAsync();
                }

                var identity = await service.GetIdentityAsync(userId);

                var token = tokenFactory.CreateToken(identity);

                return Ok(new { token });
            }
            catch (Exception ex)
            {
                logger.Error($"Failed to Authenticate user '{userId}'", ex);

                string siteRoot = $"{Request.Scheme}://{Request.Host}{Url.Content("~")}";
                string url = Encoding.UTF8.GetString(Convert.FromBase64String(base64Url));
                string encodedUrl = WebUtility.UrlEncode(url);
                string merlinLoginUrl = siteRoot.Replace("MerlinCore", $@"Merlin/default.aspx?returnUrl={encodedUrl}");

                return Redirect(merlinLoginUrl);
            }
        }
    }
}