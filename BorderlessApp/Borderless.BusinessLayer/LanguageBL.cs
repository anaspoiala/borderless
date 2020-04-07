using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class LanguageBL
    {
        private LanguagesDAL _languagesDAL;


        public LanguageBL(LanguagesDAL languagesDAL)
        {
            _languagesDAL = languagesDAL;
        }


        public List<Language> ReadAll()
        {
            return _languagesDAL.ReadAll();
        }

        public Language ReadById(Guid id)
        {
            return _languagesDAL.ReadById(id);
        }

        public Language ReadByName(string name)
        {
            return _languagesDAL.ReadByName(name);
        }
    }
}
