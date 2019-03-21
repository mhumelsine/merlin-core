using Isf.Core.Utils.Logging;
using Merlin.Core.Exceptions;
using Merlin.Web.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Merlin.Web.Filters
{
    public class DefaultExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly ILogger logger;

        public DefaultExceptionFilterAttribute(
            IHostingEnvironment hostingEnvironment,
            ILogger logger)
        {
            this.hostingEnvironment = hostingEnvironment;
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            logger.Error(context.Exception.Message, context.Exception);

            //show errors on screen during development
            //if(hostingEnvironment.IsDevelopment())
            //{
            context.ModelState.AddModelError(string.Empty, context.Exception.Message);
            //}else
            //{
            //    context.ModelState.AddModelError(string.Empty, "An unexpected error occurred.  Please contact the help desk");
            //}

            var response = context.HttpContext.Response;



            if (context.Exception is EntityNotFoundException)
            {
                context.Result = new NotFoundObjectResult(context.Exception.Message);
            }

            //default let the 500 go through    
            context.Result = new InternalServerErrorResult(context.ModelState);
        }
    }
}
