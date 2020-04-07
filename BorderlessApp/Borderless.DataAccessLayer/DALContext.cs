using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Borderless.DataAccessLayer
{
    public class DALContext
    {
        private const string _connectionString 
            = @"Server=DESKTOP-52CJKGG\SQLEXPRESS;Database=BorderlessDb;Trusted_Connection=True;";

        private UsersDAL _usersDAL;
        private LanguagesDAL _languagesDAL;
        private ProjectsDAL _projectsDAL;
        private PhrasesDAL _phrasesDAL;
        private TranslationsDAL _translationsDAL;
        private VotesDAL _votesDAL;

        public UsersDAL UsersDAL
            => _usersDAL ?? (_usersDAL = new UsersDAL(_connectionString));

        public LanguagesDAL LanguagesDAL
            => _languagesDAL ?? (_languagesDAL = new LanguagesDAL(_connectionString));

        public ProjectsDAL ProjectsDAL
            => _projectsDAL ?? (_projectsDAL = new ProjectsDAL(_connectionString));

        public PhrasesDAL PhrasesDAL
            => _phrasesDAL ?? (_phrasesDAL = new PhrasesDAL(_connectionString));

        public TranslationsDAL TranslationsDAL
            => _translationsDAL ?? (_translationsDAL = new TranslationsDAL(_connectionString));

        public VotesDAL VotesDAL
            => _votesDAL ?? (_votesDAL = new VotesDAL(_connectionString));


    }
}
