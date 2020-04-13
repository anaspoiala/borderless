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

        private UsersDAL _users;
        private LanguagesDAL _languages;
        private ProjectsDAL _projects;
        private PhrasesDAL _phrases;
        private TranslationsDAL _translations;
        private VotesDAL _votes;

        public UsersDAL Users
            => _users ?? (_users = new UsersDAL(_connectionString));

        public LanguagesDAL Languages
            => _languages ?? (_languages = new LanguagesDAL(_connectionString));

        public ProjectsDAL Projects
            => _projects ?? (_projects = new ProjectsDAL(_connectionString));

        public PhrasesDAL Phrases
            => _phrases ?? (_phrases = new PhrasesDAL(_connectionString));

        public TranslationsDAL Translations
            => _translations ?? (_translations = new TranslationsDAL(_connectionString));

        public VotesDAL Votes
            => _votes ?? (_votes = new VotesDAL(_connectionString));


    }
}
