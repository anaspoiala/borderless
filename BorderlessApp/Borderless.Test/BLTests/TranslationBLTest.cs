using System;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.BLTests
{
    [TestClass]
    public class TranslationBLTest
    {
        private static BLContext _context;

        [ClassInitialize]
        public static void Init(TestContext context)
        {
            _context = new BLContext();
        }

        [TestMethod]
        public void CanReadAll()
        {
            using (var data = new DbTestData())
            {
                var translations = _context.TranslationBL.ReadAll();

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
                var translation = _context.TranslationBL.ReadById(id);

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
                var translations = _context.TranslationBL.ReadByPhraseId(phraseId);

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
                var translations = _context.TranslationBL
                    .ReadByPhraseIdAndLanguageId(phraseId, languageId);

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
                var translations = _context.TranslationBL.ReadByUserId(userId);

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
                var translation = new Translation(
                    Guid.Empty, "added translation", phraseId, languageId, userId
                );

                var newTranslation = _context.TranslationBL.Add(translation);

                newTranslation.Should().NotBeNull();
                newTranslation.ID.Should().NotBe(Guid.Empty);
                newTranslation.Text.Should().Be("added translation");
                newTranslation.PhraseID.Should().Be(phraseId);
                newTranslation.LanguageID.Should().Be(languageId);
                newTranslation.UserID.Should().Be(userId);

                _context.TranslationBL.DeleteById(newTranslation.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var translationId = data.translation1.ID;
                var translation = _context.TranslationBL.ReadById(translationId);
                translation.Text = "updated";

                var updatedTranslation = _context.TranslationBL
                    .UpdateById(translationId, translation);

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
                var translationId = data.translation1.ID;

                _context.TranslationBL.ReadById(translationId).Should().NotBeNull();
                _context.VoteBL.ReadByTranslationId(translationId).Should().NotBeEmpty();

                _context.TranslationBL.DeleteById(translationId);

                _context.TranslationBL.ReadById(translationId).Should().BeNull();
                _context.VoteBL.ReadByTranslationId(translationId).Should().BeEmpty();
            }
        }
    }
}
