using System;
using System.Linq;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class PhrasesDALTest
    {
        private static PhrasesDAL dal;

        [ClassInitialize]
        public static void Init(TestContext context)
        {
            dal = new PhrasesDAL();
        }

        [TestMethod]
        public void CanReadAll()
        {
            using (var data = new DbTestData())
            {
                var phrases = dal.ReadAll();

                phrases.Should().NotBeNullOrEmpty();
                phrases.Should().HaveCountGreaterOrEqualTo(2);
            }
        }

        [TestMethod]
        public void CanReadById()
        {
            using (var data = new DbTestData())
            {
                var id = data.phrase1.ID;
                var phrase = dal.ReadById(id);

                phrase.Should().NotBeNull();
                phrase.Text.Should().Be(data.phrase1.Text);
                phrase.ProjectID.Should().Be(data.phrase1.ProjectID);
            }
        }

        [TestMethod]
        public void CanReadByProjectId()
        {
            using (var data = new DbTestData())
            {
                var projectId = data.project1.ID;
                var phrases = dal.ReadByProjectId(projectId);

                phrases.Should().NotBeNullOrEmpty();
                phrases.Should().HaveCount(1);
            }
        }

        [TestMethod]
        public void CanAdd()
        {
            using (var data = new DbTestData())
            {
                Guid projectId = data.project1.ID;
                var phrase = new Phrase(Guid.Empty, projectId, "test phrase");

                var newPhrase = dal.Add(phrase);

                newPhrase.Should().NotBeNull();
                newPhrase.ID.Should().NotBe(Guid.Empty);
                newPhrase.Text.Should().Be("test phrase");
                newPhrase.ProjectID.Should().Be(projectId);

                dal.DeleteById(newPhrase.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var phrase = data.phrase1;
                phrase.Text = "updated";

                var updatedPhrase = dal.UpdateById(phrase.ID, phrase);

                updatedPhrase.Should().NotBeNull();
                updatedPhrase.ID.Should().Be(phrase.ID);
                updatedPhrase.Text.Should().Be("updated");
                updatedPhrase.ProjectID.Should().Be(phrase.ProjectID);
            }
        }

        [TestMethod]
        public void CanDelete()
        {
            using (var data = new DbTestData())
            {
                var translationsDAL = new TranslationsDAL();
                var phraseId = data.phrase1.ID;

                dal.ReadById(phraseId).Should().NotBeNull();
                translationsDAL.ReadByPhraseId(phraseId).Should().NotBeEmpty();

                dal.DeleteById(phraseId);

                dal.ReadById(phraseId).Should().BeNull();
                translationsDAL.ReadByPhraseId(phraseId).Should().BeEmpty();
            }
        }


    }
}
