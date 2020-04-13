using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class TranslationBL
    {
        private TranslationsDAL _translationsDAL;

        public TranslationBL(TranslationsDAL translationsDAL)
        {
            _translationsDAL = translationsDAL;
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

        public Translation Add(Translation translation)
        {
            return _translationsDAL.Add(translation);
        }

        public Translation UpdateById(Guid id, Translation translation)
        {
            return _translationsDAL.UpdateById(id, translation);
        }

        public void DeleteById(Guid projectId)
        {
            _translationsDAL.DeleteById(projectId);
        }
    }
}
