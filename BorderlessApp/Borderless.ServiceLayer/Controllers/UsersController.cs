using System;
using System.Web.Http;
using System.Web.Http.Cors;
using Borderless.BusinessLayer;
using Borderless.BusinessLayer.Entities;
using Borderless.Model.Entities;
using Borderless.ServiceLayer.Helpers;
using Service = Borderless.ServiceLayer.Entities;

namespace Borderless.ServiceLayer.Controllers
{
    [RoutePrefix("api")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        [Route("users/{id:guid}")]
        public Service.User GetById(Guid id)
        {
            var user = _context.Users.GetById(id);
            return ConvertToServiceLayerUser(user);
        }

        [HttpPost]
        [Route("users")]
        public IHttpActionResult Register([FromBody] RegistrationDetails registrationDetails)
        {
            var user = _context.Users.Register(registrationDetails);
            return Ok(ConvertToServiceLayerUser(user));
        }

        [HttpPut]
        [Authorize]
        [Route("users")]
        public IHttpActionResult UpdateById([FromBody]UserUpdateDetails updateDetails)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            var user = _context.Users.UpdateById(authenticatedUserId, updateDetails);
            return Ok(ConvertToServiceLayerUser(user));
        }

        [HttpPut]
        [Authorize]
        [Route("users/updatePassword")]
        public IHttpActionResult UpdatePasswordById([FromBody]Service.PasswordUpdate passwordUpdate)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            var user = _context.Users.UpdatePasswordById(authenticatedUserId, passwordUpdate.Password);
            return Ok(ConvertToServiceLayerUser(user));
        }

        [HttpDelete]
        [Authorize]
        [Route("users")]
        public IHttpActionResult DeleteById()
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            _context.Users.DeleteById(authenticatedUserId);
            return Ok();
        }

        private Service.User ConvertToServiceLayerUser(User user)
        {
            return new Service.User
            {
                ID = user.ID,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
        }

    }
}
