using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class ProjectBL
    {
        private ProjectsDAL _projectsDAL;

        public ProjectBL(ProjectsDAL projectsDAL)
        {
            _projectsDAL = projectsDAL;
        }

        public List<Project> ReadAll()
        {
            return _projectsDAL.ReadAll();
        }

        public Project ReadById(Guid id)
        {
            return _projectsDAL.ReadById(id);
        }

        public List<Project> ReadByUserId(Guid userId)
        {
            return _projectsDAL.ReadByUserId(userId);
        }

        public Project Add(Project project)
        {
            return _projectsDAL.Add(project);
        }

        public Project UpdateById(Guid projectId, Project project)
        {
            return _projectsDAL.UpdateById(projectId, project);
        }

        public void DeleteById(Guid projectId)
        {
            _projectsDAL.DeleteById(projectId);
        }
    }
}
