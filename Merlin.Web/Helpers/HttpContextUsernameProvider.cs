using Isf.Core.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Merlin.Web.Helpers
{
    public class HttpContextUsernameProvider : IUsernameProvider
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        public HttpContextUsernameProvider(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }
        public string GetUsername()
        {
            var user = httpContextAccessor.HttpContext.User;
            var claim = user.FindFirst(ClaimTypes.NameIdentifier);

            return claim?.Value ?? user.Identity.Name;
        }
    }
}
