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
    public class LanguagesController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        public List<Language> GetAll()
        {
            return _context.Languages.GetAll();
        }

        [HttpGet]
        public Language GetById(Guid id)
        {
            return _context.Languages.GetById(id);
        }

        [HttpGet]
        public Language GetByName(string name)
        {
            return _context.Languages.GetByName(name);
        }
    }
}
