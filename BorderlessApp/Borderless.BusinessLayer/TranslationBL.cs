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

        public List<Translation> ReadAll()
        {
            return _translationsDAL.ReadAll();
        }

        public Translation ReadById(Guid id)
        {
            return _translationsDAL.ReadById(id);
        }

        public List<Translation> ReadByPhraseId(Guid phraseId)
        {
            return _translationsDAL.ReadByPhraseId(phraseId);
        }

        public List<Translation> ReadByPhraseIdAndLanguageId(Guid phraseId, Guid languageId)
        {
            return _translationsDAL.ReadByPhraseIdAndLanguageId(phraseId, languageId);
        }

        public List<Translation> ReadByUserId(Guid userId)
        {
            return _translationsDAL.ReadByUserId(userId);
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
