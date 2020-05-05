using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Borderless.ServiceLayer.MessageHandlers;

namespace Borderless.ServiceLayer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();


            // Web API routes
            config.MapHttpAttributeRoutes();

            config.MessageHandlers.Add(new JwtTokenValidationHandler());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
