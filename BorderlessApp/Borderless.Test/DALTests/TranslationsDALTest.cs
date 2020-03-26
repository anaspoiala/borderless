using System;
using System.Linq;
using Borderless.DataAccessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class TranslationsDALTest
    {
        [TestMethod]
        public void CanReadAll()
        {
            var dal = new TranslationsDAL();
            var translations = dal.ReadAll();

            translations.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void CanReadById()
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
        public void CanReadByPhraseId()
        {
            var dal = new TranslationsDAL();
            var phraseId = new Guid("FA39EA0F-77E1-435A-BDDD-1C9C0F033D9B");
            var translations = dal.ReadByPhraseId(phraseId);

            translations.Should().NotBeNullOrEmpty();
            translations.Should().HaveCount(3);
        }

        [TestMethod]
        public void CanReadByPhraseIdAndLanguageId()
        {
            var dal = new TranslationsDAL();
            var phraseId = new Guid("FA39EA0F-77E1-435A-BDDD-1C9C0F033D9B");
            var languageId = new Guid("B762AA7A-F41E-4121-9CA2-5D8B9F438C5D");
            var translations = dal.ReadByPhraseIdAndLanguageId(phraseId, languageId);

            translations.Should().NotBeNullOrEmpty();
            translations.Should().HaveCount(2);
        }
    }
}
