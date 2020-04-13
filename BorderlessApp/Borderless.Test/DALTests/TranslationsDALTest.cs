using System;
using System.Linq;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class TranslationsDALTest
    {
        private static TranslationsDAL dal;

        [ClassInitialize]
        public static void Init(TestContext context)
        {
            dal = new TranslationsDAL(DbTestData.ConnectionString);
        }

        [TestMethod]
        public void CanReadAll()
        {
            using (var data = new DbTestData())
            {
                var translations = dal.ReadAll();

                translations.Should().NotBeNullOrEmpty();
                translations.Should().HaveCountGreaterOrEqualTo(2);
            }
        }

        [TestMethod]
        public void CanReadById()
        {
            using (var data = new DbTestData())
            {
                var id = data.translation1.ID;
                var translation = dal.ReadById(id);

                translation.Should().NotBeNull();
                translation.Text.Should().Be(data.translation1.Text);
                translation.PhraseID.Should().Be(data.translation1.PhraseID);
                translation.LanguageID.Should().Be(data.translation1.LanguageID);
                translation.UserID.Should().Be(data.translation1.UserID);
            }
        }

        [TestMethod]
        public void CanReadByPhraseId()
        {
            using (var data = new DbTestData())
            {
                var phraseId = data.phrase1.ID;
                var translations = dal.ReadAllByPhraseId(phraseId);

                translations.Should().NotBeNullOrEmpty();
                translations.Should().HaveCount(1);
            }
        }

        [TestMethod]
        public void CanReadByPhraseIdAndLanguageId()
        {
            using (var data = new DbTestData())
            {
                var phraseId = data.phrase1.ID;
                var languageId = data.language2.ID;
                var translations = dal.ReadAllByPhraseIdAndLanguageId(phraseId, languageId);

                translations.Should().NotBeNullOrEmpty();
                translations.Should().HaveCount(1);
            }
        }

        [TestMethod]
        public void CanReadByUserId()
        {
            using (var data = new DbTestData())
            {
                var userId = data.user1.ID;
                var translations = dal.ReadAllByUserId(userId);

                translations.Should().NotBeNullOrEmpty();
                translations.Should().HaveCount(1);
            }
        }

        [TestMethod]
        public void CanAdd()
        {
            using (var data = new DbTestData())
            {
                var userId = data.user1.ID;
                var phraseId = data.phrase1.ID;
                var languageId = data.language2.ID;
                var translation = new Translation(Guid.Empty, "added translation", phraseId, languageId, userId);

                var newTranslation = dal.Add(translation);

                newTranslation.Should().NotBeNull();
                newTranslation.ID.Should().NotBe(Guid.Empty);
                newTranslation.Text.Should().Be("added translation");
                newTranslation.PhraseID.Should().Be(phraseId);
                newTranslation.LanguageID.Should().Be(languageId);
                newTranslation.UserID.Should().Be(userId);

                dal.DeleteById(newTranslation.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var translationId = data.translation1.ID;
                var translation = dal.ReadById(translationId);
                translation.Text = "updated";

                var updatedTranslation = dal.UpdateById(translationId, translation);

                updatedTranslation.Should().NotBeNull();
                updatedTranslation.ID.Should().Be(translationId);
                updatedTranslation.Text.Should().Be("updated");
            }
        }

        [TestMethod]
        public void CanDelete()
        {
            using (var data = new DbTestData())
            {
                var votesDAL = new VotesDAL(DbTestData.ConnectionString);
                var translationId = data.translation1.ID;

                dal.ReadById(translationId).Should().NotBeNull();
                votesDAL.ReadAllByTranslationId(translationId).Should().NotBeEmpty();

                dal.DeleteById(translationId);

                dal.ReadById(translationId).Should().BeNull();
                votesDAL.ReadAllByTranslationId(translationId).Should().BeEmpty();
            }
        }


    }
}
