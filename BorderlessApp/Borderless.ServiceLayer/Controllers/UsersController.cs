using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Borderless.BusinessLayer;
using Borderless.BusinessLayer.Entities;
using Borderless.Model.Entities;
using Service = Borderless.ServiceLayer.Entities;

namespace Borderless.ServiceLayer.Controllers
{
    public class UsersController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        public List<Service.User> GetAll()
        {
            return _context.Users
                .GetAll()
                .Select((user) => ConvertToServiceLayerUser(user))
                .ToList();
        }

        [HttpGet]
        [Authorize]
        public Service.User GetById(Guid id)
        {
            var user = _context.Users.GetById(id);
            return ConvertToServiceLayerUser(user);
        }

        [HttpPost]
        public IHttpActionResult Register([FromBody] RegistrationDetails registrationDetails)
        {
            var user = _context.Users.Register(registrationDetails);
            return Ok(ConvertToServiceLayerUser(user));
        }

        [HttpPut]
        [Authorize]
        public Service.User UpdateById(Guid id, [FromBody]UserUpdateDetails updateDetails)
        {
            var user = _context.Users.UpdateById(id, updateDetails);
            return ConvertToServiceLayerUser(user);
        }

        [HttpPut]
        [Authorize]
        public Service.User UpdatePasswordById(Guid id, [FromBody]Service.PasswordUpdate passwordUpdate)
        {
            var user = _context.Users.UpdatePasswordById(id, passwordUpdate.Password);
            return ConvertToServiceLayerUser(user);
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

        [HttpDelete]
        [Authorize]
        public void DeleteById(Guid id)
        {
            _context.Users.DeleteById(id);
        }
    }
}
