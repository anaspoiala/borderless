using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class PhraseBL
    {
        private PhrasesDAL _phrasesDAL;


        public PhraseBL(PhrasesDAL phrasesDAL)
        {
            _phrasesDAL = phrasesDAL;
        }


        public List<Phrase> ReadAll()
        {
            return _phrasesDAL.ReadAll();
        }

        public Phrase ReadById(Guid id)
        {
            return _phrasesDAL.ReadById(id);
        }

        public List<Phrase> ReadByProjectId(Guid projectId)
        {
            return _phrasesDAL.ReadByProjectId(projectId);
        }

        public Phrase Add(Phrase phrase)
        {
            return _phrasesDAL.Add(phrase);
        }

        public Phrase UpdateById(Guid id, Phrase phrase)
        {
            return _phrasesDAL.UpdateById(id, phrase);
        }

        public void DeleteById(Guid id)
        {
            _phrasesDAL.DeleteById(id);
        }
    }
}
