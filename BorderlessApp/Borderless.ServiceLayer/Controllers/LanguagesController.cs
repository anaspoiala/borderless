using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;

namespace Borderless.ServiceLayer.Controllers
{
    [RoutePrefix("api")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LanguagesController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        [Route("languages")]
        public List<Language> GetAll()
        {
            return _context.Languages.GetAll();
        }

        [HttpGet]
        [Authorize]
        [Route("languages/{id:guid}")]
        public Language GetById(Guid id)
        {
            return _context.Languages.GetById(id);
        }
    }
}
