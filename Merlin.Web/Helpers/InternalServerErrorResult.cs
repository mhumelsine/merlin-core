using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Merlin.Web.Helpers
{
    public class InternalServerErrorResult : BadRequestObjectResult
    {
        public InternalServerErrorResult(ModelStateDictionary error) : base(error)
        {
            base.StatusCode = (int)HttpStatusCode.InternalServerError;
        }
    }
}
