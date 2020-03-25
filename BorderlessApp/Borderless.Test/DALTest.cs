using System;
using System.Linq;
using Borderless.DataAccessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test
{
    [TestClass]
    public class DALTest
    {
        [TestMethod]
        public void LanguagesDAL_CanReadAll()
        {
            var dal = new LanguagesDAL();
            var languages = dal.ReadAll();

            languages.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void LanguagesDAL_CanReadById()
        {
            var dal = new LanguagesDAL();
            var id = new Guid("24653028-8AE0-47FE-B4B5-046C904C56DE");
            var language = dal.ReadById(id);

            language.Should().NotBeNull();
            language.Name.Should().Be("German");
            language.Abbreviation.Should().Be("de");
        }

        [TestMethod]
        public void ProjectsDAL_CanReadAll()
        {
            var dal = new ProjectsDAL();
            var projects = dal.ReadAll();

            projects.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void ProjectsDAL_CanReadById()
        {
            var dal = new ProjectsDAL();
            var id = new Guid("2147B59C-B856-42A6-A811-63286354D7C9");
            var project = dal.ReadById(id);

            project.Should().NotBeNull();
            project.Name.Should().Be("Mastersky Game");
            project.SourceLanguage.Name.Should().Be("English");
            project.TargetLanguages.Should().HaveCount(3);
            project.TargetLanguages
                .Where(l => l.Name == "German" || l.Name == "Japanese" || l.Name == "French").ToList()
                .Should().HaveCount(3);
        }

        [TestMethod]
        public void PhrasesDAL_CanReadAll()
        {
            var dal = new PhrasesDAL();
            var phrases = dal.ReadAll();

            phrases.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void PhrasesDAL_CanReadById()
        {
            var dal = new PhrasesDAL();
            var id = new Guid("2AD88467-8113-4F2E-9659-454C03B95329");
            var phrase = dal.ReadById(id);

            phrase.Should().NotBeNull();
            phrase.Text.Should().Be("a pained expression");
            phrase.ProjectID.Should().Be(new Guid("2147B59C-B856-42A6-A811-63286354D7C9"));
        }

        [TestMethod]
        public void PhrasesDAL_CanReadByProjectId()
        {
            var dal = new PhrasesDAL();
            var projectId = new Guid("2147B59C-B856-42A6-A811-63286354D7C9");
            var phrases = dal.ReadByProjectId(projectId);

            phrases.Should().NotBeNullOrEmpty();
            phrases.Should().HaveCount(6);
            phrases.Where(p => p.Text == "a pained expression").Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void TranslationsDAL_CanReadAll()
        {
            var dal = new TranslationsDAL();
            var translations = dal.ReadAll();

            translations.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void TranslationsDAL_CanReadById()
        {
            var dal = new TranslationsDAL();
            var id = new Guid("D7473354-ED42-4514-88C4-FF5FC778A4B0");
            var translation = dal.ReadById(id);

            translation.Should().NotBeNull();
            translation.Text.Should().Be("suono tintinnante");
            translation.PhraseID.Should().Be(new Guid("FA39EA0F-77E1-435A-BDDD-1C9C0F033D9B"));
            translation.LanguageID.Should().Be(new Guid("B762AA7A-F41E-4121-9CA2-5D8B9F438C5D"));
            translation.UserID.Should().Be(new Guid("D5300870-9046-42C4-A060-044DD318E313"));
        }

        [TestMethod]
        public void TranslationsDAL_CanReadByPhraseId()
        {
            var dal = new TranslationsDAL();
            var phraseId = new Guid("FA39EA0F-77E1-435A-BDDD-1C9C0F033D9B");
            var translations = dal.ReadByPhraseId(phraseId);

            translations.Should().NotBeNullOrEmpty();
            translations.Should().HaveCount(3);
        }

        [TestMethod]
        public void TranslationsDAL_CanReadByPhraseIdAndLanguageId()
        {
            var dal = new TranslationsDAL();
            var phraseId = new Guid("FA39EA0F-77E1-435A-BDDD-1C9C0F033D9B");
            var languageId = new Guid("B762AA7A-F41E-4121-9CA2-5D8B9F438C5D");
            var translations = dal.ReadByPhraseIdAndLanguageId(phraseId, languageId);

            translations.Should().NotBeNullOrEmpty();
            translations.Should().HaveCount(2);
        }

        [TestMethod]
        public void VotesDAL_CanReadAll()
        {
            var dal = new VotesDAL();
            var votes = dal.ReadAll();

            votes.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void VotesDAL_CanReadById()
        {
            var dal = new VotesDAL();
            var userId = new Guid("953D23D7-72D7-4C2A-9CC7-BF6FE8676094");
            var translationId = new Guid("BB6502D2-8608-4A64-8F11-9A04DB11F1CB");
            var vote = dal.ReadById(userId, translationId);

            vote.Should().NotBeNull();
            vote.IsUpvote.Should().BeTrue();
        }

        [TestMethod]
        public void VotesDAL_CanReadByTranslationId()
        {
            var dal = new VotesDAL();
            var translationId = new Guid("BB6502D2-8608-4A64-8F11-9A04DB11F1CB");
            var votes = dal.ReadByTranslationId(translationId);

            votes.Should().NotBeNullOrEmpty();
            votes.Should().HaveCount(3);
        }

    }
}
