using System;
using System.Collections.Generic;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test
{
    [TestClass]
    public class ModelTest
    {
        [TestMethod]
        public void User_CanCreate()
        {
            var guid = Guid.NewGuid();
            var user = new User(guid,
                "user1",
                "8ee2027983915ec78acc45027d874316",
                "Victoria",
                "Collins",
                "VictoriaCollins@test.com");

            user.Should().NotBeNull();
            user.ID.Should().Be(guid);
            user.Username.Should().Be("user1");
            user.PasswordHash.Should().Be("8ee2027983915ec78acc45027d874316");
            user.FirstName.Should().Be("Victoria");
            user.LastName.Should().Be("Collins");
            user.Email.Should().Be("VictoriaCollins@test.com");
        }

        [TestMethod]
        public void Language_CanCreate()
        {
            var guid = Guid.NewGuid();
            var language = new Language(guid, "English", "en");

            language.Should().NotBeNull();
            language.ID.Should().Be(guid);
            language.Name.Should().Be("English");
            language.Abbreviation.Should().Be("en");
        }

        [TestMethod]
        public void Project_CanCreate()
        {
            var userGuid = Guid.NewGuid();
            var user = new User(userGuid,
                "user1",
                "8ee2027983915ec78acc45027d874316",
                "Victoria",
                "Collins",
                "VictoriaCollins@test.com");

            var englishLang = new Language(Guid.NewGuid(), "English", "en");
            var germanLang = new Language(Guid.NewGuid(), "German", "de");
            var japaneseLang = new Language(Guid.NewGuid(), "Japanese", "ja");

            var guid = Guid.NewGuid();
            var project = new Project(guid,
                userGuid,
                "Test name",
                "some text...",
                englishLang,
                new List<Language> { germanLang, japaneseLang });

            project.Should().NotBeNull();
            project.ID.Should().Be(guid);
            project.UserID.Should().Be(userGuid);
            project.Name.Should().Be("Test name");
            project.Description.Should().Be("some text...");
            project.SourceLanguage.Should().NotBeNull();
            project.SourceLanguage.Should().Be(englishLang);
            project.TargetLanguages.Should().NotBeNullOrEmpty();
            project.TargetLanguages.Should().NotContainNulls();
            project.TargetLanguages.Should().HaveCount(2);
        }

        [TestMethod]
        public void Phrase_CanCreate()
        {
            var user = new User(Guid.NewGuid(), "", "", "", "", "");
            var project = new Project(Guid.NewGuid(),
                user.ID,
                "Test name",
                "some text...",
                new Language(Guid.NewGuid(), "Test", "test"),
                new List<Language>());

            var guid = Guid.NewGuid();
            var phrase = new Phrase(guid, project.ID, "test phrase");

            phrase.Should().NotBeNull();
            phrase.ID.Should().Be(guid);
            phrase.ProjectID.Should().Be(project.ID);
            phrase.Text.Should().NotBeEmpty();
            phrase.Text.Should().Be("test phrase");
        }

        [TestMethod]
        public void Translation_CanCreate()
        {
            var user = new User(Guid.NewGuid(), "", "", "", "", "");
            var language = new Language(Guid.NewGuid(), "Test", "test");
            var project = new Project(Guid.NewGuid(),
                user.ID,
                "Test name",
                "some text...",
                new Language(Guid.NewGuid(), "Test", "test"),
                new List<Language>());
            var phrase = new Phrase(Guid.NewGuid(), project.ID, "test phrase");

            var guid = Guid.NewGuid();
            var translation = new Translation(guid, "translated text", phrase.ID, language.ID, user.ID);

            translation.Should().NotBeNull();
            translation.ID.Should().Be(guid);
            translation.Text.Should().NotBeEmpty();
            translation.Text.Should().Be("translated text");
            translation.PhraseID.Should().Be(phrase.ID);
            translation.LanguageID.Should().Be(language.ID);
            translation.UserID.Should().Be(user.ID);
        }

        [TestMethod]
        public void Vote_CanCreate()
        {
            var voter = new User(Guid.NewGuid(), "", "", "", "", "");
            var projectOwner = new User(Guid.NewGuid(), "", "", "", "", "");
            var language = new Language(Guid.NewGuid(), "Test", "test");
            var project = new Project(Guid.NewGuid(),
                projectOwner.ID,
                "Test name",
                "some text...",
                new Language(Guid.NewGuid(), "Test", "test"),
                new List<Language>());
            var phrase = new Phrase(Guid.NewGuid(), project.ID, "test phrase");
            var translation = new Translation(Guid.NewGuid(), "translated text", phrase.ID, language.ID, voter.ID);

            var vote = new Vote(voter.ID, translation.ID, true);

            vote.Should().NotBeNull();
            vote.UserID.Should().Be(voter.ID);
            vote.TranslationID.Should().Be(translation.ID);
            vote.IsUpvote.Should().BeTrue();
        }


    }
}
