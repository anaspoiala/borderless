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
    public class ProjectsController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        [Route("projects")]
        public IHttpActionResult GetAll()
        {
            return Ok(_context.Projects.GetAll());
        }

        [HttpGet]
        [Authorize]
        [Route("projects/{id:guid}")]
        public IHttpActionResult GetById(Guid id)
        {
            return Ok(_context.Projects.GetById(id));
        }

        [HttpGet]
        [Authorize]
        [Route("users/{id:guid}/projects")]
        public IHttpActionResult GetAllByUserId(Guid id)
        {
            return Ok(_context.Projects.GetAllByUserId(id));
        }

        [HttpPost]
        [Authorize]
        [Route("projects")]
        public IHttpActionResult Add([FromBody]Project project)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return Ok(_context.Projects.Add(project, authenticatedUserId));

        }

        [HttpPut]
        [Authorize]
        [Route("projects/{id:guid}")]
        public IHttpActionResult UpdateById(Guid id, [FromBody]Project project)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return Ok(_context.Projects.UpdateById(id, project, authenticatedUserId));
        }

        [HttpDelete]
        [Authorize]
        [Route("projects/{id:guid}")]
        public IHttpActionResult DeleteById(Guid id)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            _context.Projects.DeleteById(id, authenticatedUserId);
            return Ok();
        }
    }
}
