using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class PhraseBL
    {
        private PhrasesDAL _phrasesDAL;
        private ProjectsDAL _projectsDAL;

        public PhraseBL(PhrasesDAL phrasesDAL, ProjectsDAL projectsDAL)
        {
            _phrasesDAL = phrasesDAL;
            _projectsDAL = projectsDAL;
        }


        public List<Phrase> GetAll()
        {
            return _phrasesDAL.ReadAll();
        }

        public Phrase GetById(Guid id)
        {
            return _phrasesDAL.ReadById(id);
        }

        public List<Phrase> GetAllByProjectId(Guid projectId)
        {
            return _phrasesDAL.ReadAllByProjectId(projectId);
        }

        public Phrase Add(Phrase phrase, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsProjectOwner(phrase.ProjectID, authenticatedUserId);
            return _phrasesDAL.Add(phrase);
        }

        public Phrase UpdateById(Guid id, Phrase phrase, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsProjectOwner(phrase.ProjectID, authenticatedUserId);
            return _phrasesDAL.UpdateById(id, phrase);
        }

        public void DeleteById(Guid id, Guid authenticatedUserId)
        {
            var phrase = _phrasesDAL.ReadById(id);
            ValidateAuthenticatedUserIsProjectOwner(phrase.ProjectID, authenticatedUserId);
            _phrasesDAL.DeleteById(id);
        }

        private void ValidateAuthenticatedUserIsProjectOwner(Guid projectId, Guid authenticatedUserId)
        {
            var projectUserId = _projectsDAL.ReadById(projectId).UserID;

            if (authenticatedUserId != projectUserId)
            {
                throw new ArgumentException("The authenticated user MUST be the project owner!");
            }
        }
    }
}
