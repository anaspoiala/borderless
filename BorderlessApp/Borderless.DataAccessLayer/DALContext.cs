using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Borderless.DataAccessLayer
{
    public class DALContext
    {
        private const string _connectionString = @"Server=DESKTOP-52CJKGG\SQLEXPRESS;Database=BorderlessDb;Trusted_Connection=True;";
        private UsersDAL _usersDAL;
        private LanguagesDAL _languagesDAL;
        private ProjectsDAL _projectsDAL;
        private PhrasesDAL _phrasesDAL;
        private TranslationsDAL _translationsDAL;
        private VotesDAL _votesDAL;

        public UsersDAL UsersDAL
        {
            get
            {
                if (_usersDAL == null)
                {
                    _usersDAL = new UsersDAL(_connectionString);
                }

                return _usersDAL;
            }
            set => _usersDAL = value;
        }

        public LanguagesDAL LanguagesDAL
        {
            get
            {
                if (_languagesDAL == null)
                {
                    _languagesDAL = new LanguagesDAL(_connectionString);
                }

                return _languagesDAL;
            }
            set => _languagesDAL = value;
        }

        public ProjectsDAL ProjectsDAL
        {
            get
            {
                if (_projectsDAL == null)
                {
                    _projectsDAL = new ProjectsDAL(_connectionString);
                }

                return _projectsDAL;
            }
            set => _projectsDAL = value;
        }

        public PhrasesDAL PhrasesDAL
        {
            get
            {
                if (_phrasesDAL == null)
                {
                    _phrasesDAL = new PhrasesDAL(_connectionString);
                }

                return _phrasesDAL;
            }
            set => _phrasesDAL = value;
        }

        public TranslationsDAL TranslationsDAL
        {
            get
            {
                if (_translationsDAL == null)
                {
                    _translationsDAL = new TranslationsDAL(_connectionString);
                }

                return _translationsDAL;
            }
            set => _translationsDAL = value;
        }

        public VotesDAL VotesDAL
        {
            get
            {
                if (_votesDAL == null)
                {
                    _votesDAL = new VotesDAL(_connectionString);
                }

                return _votesDAL;
            }
            set => _votesDAL = value;
        }


    }
}
