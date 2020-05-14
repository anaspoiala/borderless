using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;
using Borderless.Model.Exceptions;

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
            //ValidateAuthenticatedUserIsTranslationAuthor(translation.UserID, authenticatedUserId);
            translation.UserID = authenticatedUserId;
            return _translationsDAL.Add(translation);
        }

        public Translation UpdateById(Guid id, Translation translation, Guid authenticatedUserId)
        {
            var currentTranslation = _translationsDAL.ReadById(id);
            ValidateAuthenticatedUserIsTranslationAuthor(currentTranslation.UserID, authenticatedUserId);
            
            currentTranslation.Text = translation.Text;
            return _translationsDAL.UpdateById(id, currentTranslation);
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
                throw new ValidationException(
                    "The authenticated user MUST be the translation author!"
                );
            }
        }

        public string GetRole(Guid translationId, Guid authenticatedUserId)
        {
            var translation = _translationsDAL.ReadById(translationId);

            if (translation.UserID == authenticatedUserId)
                return "TRANSLATION_AUTHOR";

            var phrase = _phrasesDAL.ReadById(translation.PhraseID);
            var project = _projectsDAL.ReadById(phrase.ProjectID);

            if (project.UserID == authenticatedUserId)
                return "PROJECT_OWNER";

            return "REGULAR_USER";
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
                throw new ValidationException(
                    "The authenticated user MUST be either the translation author or" + 
                    "the project owner!"
                );
            }
        }
    }
}
