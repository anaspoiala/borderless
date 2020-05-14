using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;
using Borderless.Model.Exceptions;

namespace Borderless.BusinessLayer
{
    public class ProjectBL
    {
        private ProjectsDAL _projectsDAL;

        public ProjectBL(ProjectsDAL projectsDAL)
        {
            _projectsDAL = projectsDAL;
        }

        public List<Project> GetAll()
        {
            return _projectsDAL.ReadAll();
        }

        public Project GetById(Guid id)
        {
            return _projectsDAL.ReadById(id);
        }

        public List<Project> GetAllByUserId(Guid userId)
        {
            return _projectsDAL.ReadAllByUserId(userId);
        }

        public Project Add(Project project, Guid authenticatedUserId)
        {
            project.UserID = authenticatedUserId;
            return _projectsDAL.Add(project);
        }

        public Project UpdateById(Guid projectId, Project project, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsProjectOwner(projectId, authenticatedUserId);
            project.UserID = authenticatedUserId;
            return _projectsDAL.UpdateById(projectId, project);
        }

        public void DeleteById(Guid projectId, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsProjectOwner(projectId, authenticatedUserId);
            _projectsDAL.DeleteById(projectId);
        }

        private void ValidateAuthenticatedUserIsProjectOwner(Guid projectId, Guid authenticatedUserId)
        {
            var userId = _projectsDAL.ReadById(projectId).UserID;
            if (authenticatedUserId != userId)
            {
                throw new ValidationException("The authenticated user MUST be the project owner!");
            }
        }
    }
}
