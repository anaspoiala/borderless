using System;
using System.Web.Http;
using System.Web.Http.Cors;
using Borderless.BusinessLayer;
using Borderless.BusinessLayer.Entities;
using Borderless.Model.Exceptions;
using Borderless.ServiceLayer.Entities;
using Borderless.ServiceLayer.Helpers;

namespace Borderless.ServiceLayer.Controllers
{
    [RoutePrefix("api")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpPost]
        [Route("authentication/login")]
        public IHttpActionResult Login([FromBody] LoginCredentials credentials)
        {
            bool valid = _context.Users.CheckCredentials(credentials);

            // If credentials are valid, create token and return OK response code
            if (valid)
            {
                var user = _context.Users.GetByUsername(credentials.Username);
                string token = JwtTokenHelper.CreateToken(user.ID);
                return Ok(new LoginResponse { Token = token });
            }

            // If not valid, throw error
            throw new ValidationException("Invalid login credentials!");
        }

        [HttpGet]
        [Route("authentication/isLoggedIn")]
        public bool IsLoggedIn()
        {
            try
            {
                Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
