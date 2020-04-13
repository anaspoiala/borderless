using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;

namespace Borderless.ServiceLayer.Controllers
{
    public class UsersController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        public List<User> GetAll()
        {
            return _context.Users.GetAll();
        }

        [HttpGet]
        public User GetById(Guid id)
        {
            return _context.Users.GetById(id);
        }

        [HttpPost]
        public User Add([FromBody]User user)
        {
            return _context.Users.Add(user);
        }

        [HttpPut]
        public User UpdateById(Guid id, [FromBody]User user)
        {
            return _context.Users.UpdateById(id, user);
        }

        [HttpDelete]
        public void DeleteById(Guid id)
        {
            _context.Users.DeleteById(id);
        }
    }
}
