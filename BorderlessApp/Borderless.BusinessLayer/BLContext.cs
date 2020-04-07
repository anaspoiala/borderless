using Borderless.DataAccessLayer;

namespace Borderless.BusinessLayer
{
    public class BLContext
    {
        private DALContext _dalContext;

        private UserBL _userBL;
        private LanguageBL _languageBL;
        private ProjectBL _projectBL;
        private PhraseBL _phraseBL;
        private TranslationBL _translationBL;
        private VoteBL _voteBL;

        public UserBL UserBL 
            => _userBL ?? (_userBL = new UserBL(_dalContext.UsersDAL));

        public LanguageBL LanguageBL 
            => _languageBL ?? (_languageBL = new LanguageBL(_dalContext.LanguagesDAL));

        public ProjectBL ProjectBL
            => _projectBL ?? (_projectBL = new ProjectBL(_dalContext.ProjectsDAL));

        public PhraseBL PhraseBL 
            => _phraseBL ?? (_phraseBL = new PhraseBL(_dalContext.PhrasesDAL));

        public TranslationBL TranslationBL
            => _translationBL ?? (_translationBL = new TranslationBL(_dalContext.TranslationsDAL));

        public VoteBL VoteBL 
            => _voteBL ?? (_voteBL = new VoteBL(_dalContext.VotesDAL));


        public BLContext()
        {
            _dalContext = new DALContext();
        }
    }
}
