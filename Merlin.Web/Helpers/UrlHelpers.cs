using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Merlin.Web
{
    public static class AbsoluteUrlHelper
    {
        public static string AbsoluteUrl(this IUrlHelper Url, HttpContext Context, string relativeUrl)
        {            
            return $"{Context.Request.Scheme}://{Context.Request.Host}{Url.Content(relativeUrl)}";
        }
    }
}
