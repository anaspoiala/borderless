using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Borderless.ServiceLayer.Helpers;
using Microsoft.IdentityModel.Tokens;

namespace Borderless.ServiceLayer.MessageHandlers
{
    public class JwtTokenValidationHandler : DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            // Get the token from the authorization header
            if (!TryRetrieveTokenFromHeader(request, out string token))
            {
                // Requests will be passed to controllers that don't have the [Authorize] attribute.
                return base.SendAsync(request, cancellationToken);
            }

            HttpStatusCode statusCodeInCaseOfExceptions = HttpStatusCode.InternalServerError;

            try
            {
                ClaimsPrincipal validatedToken = JwtTokenHelper.ReadAndValidateToken(token);

                // extract and assign the user of the jwt
                Thread.CurrentPrincipal = validatedToken;
                HttpContext.Current.User = validatedToken;

                return base.SendAsync(request, cancellationToken);
            }
            catch (SecurityTokenValidationException)
            {
                throw;
                statusCodeInCaseOfExceptions = HttpStatusCode.Unauthorized;
            }
            catch (Exception)
            {
                statusCodeInCaseOfExceptions = HttpStatusCode.InternalServerError;
            }

            return Task<HttpResponseMessage>.Factory.StartNew(
                () => new HttpResponseMessage(statusCodeInCaseOfExceptions) { },
                cancellationToken
            );
        }

        private static bool TryRetrieveTokenFromHeader(HttpRequestMessage request, out string token)
        {
            token = null;
            IEnumerable<string> authorizationHeaders;

            // Return false if the request has either 0 or more than 1 authorization header
            if (!request.Headers.TryGetValues("Authorization", out authorizationHeaders) ||
                authorizationHeaders.Count() > 1)
            {
                return false;
            }

            string bearerToken = authorizationHeaders.ElementAt(0);
            token = bearerToken.StartsWith("Bearer ")
                ? bearerToken.Substring(7)  // Remove the "Bearer " part from the beginning
                : bearerToken;

            return true;
        }
    }
}