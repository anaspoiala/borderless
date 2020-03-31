using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.Test
{
    public class DbTestData : IDisposable
    {
        public User user1;
        public User user2;
        public Project project1;
        public Project project2;
        public Language language1;
        public Language language2;
        public Phrase phrase1;
        public Phrase phrase2;
        public Translation translation1;
        public Translation translation2;
        public Vote vote1;
        public Vote vote2;

        private UsersDAL _usersDAL;
        private LanguagesDAL _languagesDAL;
        private ProjectsDAL _projectsDAL;
        private PhrasesDAL _phrasesDAL;
        private TranslationsDAL _translationsDAL;
        private VotesDAL _votesDAL;

        public DbTestData()
        {
            InitDAL();

            InitUsers();
            InitLanguages();
            InitProjects();
            InitPhrases();
            InitTranslations();
            InitVotes();
        }


        public void Dispose()
        {
            DisposeVotes();
            DisposeTranslations();
            DisposePhrases();
            DisposeProjects();
            DisposeUsers();
        }


        private void InitDAL()
        {
            _usersDAL = new UsersDAL();
            _languagesDAL = new LanguagesDAL();
            _projectsDAL = new ProjectsDAL();
            _phrasesDAL = new PhrasesDAL();
            _translationsDAL = new TranslationsDAL();
            _votesDAL = new VotesDAL();
        }

        private void InitUsers()
        {
            user1 = _usersDAL.Add(new User(Guid.Empty, "dummyUser1", "8ee2027983915ec78acc45027d874316", "Jack", "Jones", "test1@email.com"));
            user2 = _usersDAL.Add(new User(Guid.Empty, "dummyUser2", "8ee2027985915ec78acc45067d874317", "Helen", "Rice", "test2@email.com"));
        }

        private void InitLanguages()
        {
            language1 = _languagesDAL.ReadById(new Guid("459A4220-416C-4100-B608-6EEDD49E8E91"));  // english
            language2 = _languagesDAL.ReadById(new Guid("24653028-8AE0-47FE-B4B5-046C904C56DE"));  // german
        }

        private void InitProjects()
        {
            project1 = _projectsDAL.Add(new Project(Guid.Empty, user1.ID, "Project 1", "", language1, new List<Language> { language2 }));
            project2 = _projectsDAL.Add(new Project(Guid.Empty, user2.ID, "Project 2", "", language2, new List<Language> { language1 }));
        }

        private void InitPhrases()
        {
            phrase1 = _phrasesDAL.Add(new Phrase(Guid.Empty, project1.ID, "test phrase 1"));
            phrase2 = _phrasesDAL.Add(new Phrase(Guid.Empty, project2.ID, "test phrase 2"));
        }

        private void InitTranslations()
        {
            translation1 = _translationsDAL.Add(new Translation(Guid.Empty, "translation 1", phrase1.ID, language2.ID, user2.ID));
            translation2 = _translationsDAL.Add(new Translation(Guid.Empty, "translation 2", phrase2.ID, language1.ID, user1.ID));
        }

        private void InitVotes()
        {
            vote1 = _votesDAL.Add(new Vote(user1.ID, translation2.ID, true));
            vote2 = _votesDAL.Add(new Vote(user2.ID, translation1.ID, false));
        }

        private void DisposeUsers()
        {
            _usersDAL.DeleteById(user1.ID);
            _usersDAL.DeleteById(user2.ID);
        }


        private void DisposeProjects()
        {
            _projectsDAL.DeleteById(project1.ID);
            _projectsDAL.DeleteById(project2.ID);
        }

        private void DisposePhrases()
        {
            _phrasesDAL.DeleteById(phrase1.ID);
            _phrasesDAL.DeleteById(phrase2.ID);
        }

        private void DisposeTranslations()
        {
            _translationsDAL.DeleteById(translation1.ID);
            _translationsDAL.DeleteById(translation2.ID);
        }

        private void DisposeVotes()
        {
            _votesDAL.DeleteById(vote1.UserID, vote1.TranslationID);
            _votesDAL.DeleteById(vote2.UserID, vote2.TranslationID);
        }
    }
}
