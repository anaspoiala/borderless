using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using Borderless.Model.Exceptions;

namespace Borderless.ServiceLayer.Helpers
{
    public class ExceptionsFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            var exception = context.Exception;

            if (exception is ValidationException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            else
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

            context.Response.Content = new StringContent(exception.Message);
        }
    }
}