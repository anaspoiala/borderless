using Borderless.DataAccessLayer;

namespace Borderless.BusinessLayer
{
    public class BLContext
    {
        private DALContext _dalContext;

        private UserBL _users;
        private LanguageBL _languages;
        private ProjectBL _projects;
        private PhraseBL _phrases;
        private TranslationBL _translations;
        private VoteBL _votes;

        public UserBL Users
            => _users ?? (_users = new UserBL(_dalContext.Users));

        public LanguageBL Languages
            => _languages ?? (_languages = new LanguageBL(_dalContext.Languages));

        public ProjectBL Projects
            => _projects ?? (_projects = new ProjectBL(_dalContext.Projects));

        public PhraseBL Phrases
            => _phrases ?? (_phrases = new PhraseBL(
                    _dalContext.Phrases,
                    _dalContext.Projects)
                );

        public TranslationBL Translations
            => _translations ?? (_translations = new TranslationBL(
                    _dalContext.Translations,
                    _dalContext.Phrases,
                    _dalContext.Projects
                ));

        public VoteBL Votes
            => _votes ?? (_votes = new VoteBL(_dalContext.Votes));


        public BLContext()
        {
            _dalContext = new DALContext();
        }
    }
}
