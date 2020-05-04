using System.Web.Http;
using Borderless.BusinessLayer;
using Borderless.BusinessLayer.Entities;
using Borderless.ServiceLayer.Entities;
using Borderless.ServiceLayer.Helpers;

namespace Borderless.ServiceLayer.Controllers
{
    public class AuthenticationController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpPost]
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

            // If not valid, return Unauthorized response code and message
            return Unauthorized();
        }
    }
}
    