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
    public class ProjectsController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        public List<Project> GetAll()
        {
            return _context.Projects.GetAll();
        }

        [HttpGet]
        [Authorize]
        public Project GetById(Guid id)
        {
            return _context.Projects.GetById(id);
        }

        [HttpGet]
        [Authorize]
        public List<Project> GetAllByUserId(Guid userId)
        {
            return _context.Projects.GetAllByUserId(userId);
        }

        [HttpPost]
        [Authorize]
        public Project Add([FromBody]Project project)
        {
            return _context.Projects.Add(project);
        }

        [HttpPut]
        [Authorize]
        public Project UpdateById(Guid projectId, [FromBody]Project project)
        {
            return _context.Projects.UpdateById(projectId, project);
        }

        [HttpDelete]
        [Authorize]
        public void DeleteById(Guid projectId)
        {
            _context.Projects.DeleteById(projectId);
        }
    }
}
