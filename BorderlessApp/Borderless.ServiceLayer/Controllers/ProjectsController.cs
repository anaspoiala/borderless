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
        public List<Project> GetAll()
        {
            return _context.Projects.GetAll();
        }

        [HttpGet]
        public Project GetById(Guid id)
        {
            return _context.Projects.GetById(id);
        }

        [HttpGet]
        public List<Project> GetAllByUserId(Guid userId)
        {
            return _context.Projects.GetAllByUserId(userId);
        }

        [HttpPost]
        public Project Add([FromBody]Project project)
        {
            return _context.Projects.Add(project);
        }

        [HttpPut]
        public Project UpdateById(Guid projectId, [FromBody]Project project)
        {
            return _context.Projects.UpdateById(projectId, project);
        }

        [HttpDelete]
        public void DeleteById(Guid projectId)
        {
            _context.Projects.DeleteById(projectId);
        }
    }
}
