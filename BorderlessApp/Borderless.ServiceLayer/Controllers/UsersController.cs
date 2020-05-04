using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Borderless.BusinessLayer;
using Borderless.BusinessLayer.Entities;
using Borderless.Model.Entities;

namespace Borderless.ServiceLayer.Controllers
{
    public class UsersController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        public List<User> GetAll()
        {
            return _context.Users.GetAll();
        }

        [HttpGet]
        [Authorize]
        public User GetById(Guid id)
        {
            return _context.Users.GetById(id);
        }

        [HttpPost]
        public IHttpActionResult Register([FromBody] RegistrationDetails registrationDetails)
        {
            return Ok(_context.Users.Register(registrationDetails));
        }

        [HttpPut]
        [Authorize]
        public User UpdateById(Guid id, [FromBody]UserUpdateDetails updateDetails)
        {
            return _context.Users.UpdateById(id, updateDetails);
        }

        [HttpDelete]
        [Authorize]
        public void DeleteById(Guid id)
        {
            _context.Users.DeleteById(id);
        }
    }
}
