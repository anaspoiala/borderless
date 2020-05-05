using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class TranslationBL
    {
        private TranslationsDAL _translationsDAL;
        private PhrasesDAL _phrasesDAL;
        private ProjectsDAL _projectsDAL;

        public TranslationBL(
            TranslationsDAL translationsDAL, 
            PhrasesDAL phrasesDAL, 
            ProjectsDAL projectsDAL
        )
        {
            _translationsDAL = translationsDAL;
            _phrasesDAL = phrasesDAL;
            _projectsDAL = projectsDAL;
        }

        public List<Translation> GetAll()
        {
            return _translationsDAL.ReadAll();
        }

        public Translation GetById(Guid id)
        {
            return _translationsDAL.ReadById(id);
        }

        public List<Translation> GetAllByPhraseId(Guid phraseId)
        {
            return _translationsDAL.ReadAllByPhraseId(phraseId);
        }

        public List<Translation> GetAllByPhraseIdAndLanguageId(Guid phraseId, Guid languageId)
        {
            return _translationsDAL.ReadAllByPhraseIdAndLanguageId(phraseId, languageId);
        }

        public List<Translation> GetAllByUserId(Guid userId)
        {
            return _translationsDAL.ReadAllByUserId(userId);
        }

        public Translation Add(Translation translation, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsTranslationAuthor(translation.UserID, authenticatedUserId);
            return _translationsDAL.Add(translation);
        }

        public Translation UpdateById(Guid id, Translation translation, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsTranslationAuthor(translation.UserID, authenticatedUserId);
            return _translationsDAL.UpdateById(id, translation);
        }

        public void DeleteById(Guid id, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsTranslationAuthorOrProjectOwner(id, authenticatedUserId);
            _translationsDAL.DeleteById(id);
        }

        private void ValidateAuthenticatedUserIsTranslationAuthor(
            Guid authorId,
            Guid authenticatedUserId
        )
        {
            if (authorId != authenticatedUserId)
            {
                throw new ArgumentException(
                    "The authenticated user MUST be the translation author!"
                );
            }
        }

        private void ValidateAuthenticatedUserIsTranslationAuthorOrProjectOwner(
            Guid translationId,
            Guid authenticatedUserId
        )
        {
            var translation = _translationsDAL.ReadById(translationId);
            var translatedPhrase = _phrasesDAL.ReadById(translation.PhraseID);
            var project = _projectsDAL.ReadById(translatedPhrase.ProjectID);
            Guid projectOwnerId = project.UserID;
            Guid translationAuthorId = translation.UserID;

            if (authenticatedUserId != projectOwnerId &&
                authenticatedUserId != translationAuthorId)
            {
                throw new ArgumentException(
                    "The authenticated user MUST be either the translation author or" + 
                    "the project owner!"
                );
            }
        }
    }
}
