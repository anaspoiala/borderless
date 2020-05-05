using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;
using Borderless.ServiceLayer.Helpers;

namespace Borderless.ServiceLayer.Controllers
{
    [RoutePrefix("api")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PhrasesController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        [Route("phrases/{id:guid}")]
        public Phrase GetById(Guid id)
        {
            return _context.Phrases.GetById(id);
        }

        [HttpGet]
        [Authorize]
        [Route("projects/{id:guid}/phrases")]
        public List<Phrase> GetAllByProjectId(Guid id)
        {
            return _context.Phrases.GetAllByProjectId(id);
        }

        [HttpPost]
        [Authorize]
        [Route("phrases")]
        public IHttpActionResult Add([FromBody]Phrase phrase)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return Ok(_context.Phrases.Add(phrase, authenticatedUserId));
        }

        [HttpPut]
        [Authorize]
        [Route("phrases/{id:guid}")]
        public IHttpActionResult UpdateById(Guid id, [FromBody]Phrase phrase)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return  Ok(_context.Phrases.UpdateById(id, phrase, authenticatedUserId));
        }

        [HttpDelete]
        [Authorize]
        [Route("phrases/{id:guid}")]
        public IHttpActionResult DeleteById(Guid id)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            _context.Phrases.DeleteById(id, authenticatedUserId);
            return Ok();
        }
    }
}
