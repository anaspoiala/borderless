using System;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.BLTests
{
    [TestClass]
    public class PhraseBLTest
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
                var phrases = _context.Phrases.GetAll();

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
                var phrase = _context.Phrases.GetById(id);

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
                var phrases = _context.Phrases.GetAllByProjectId(projectId);

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

                var newPhrase = _context.Phrases.Add(phrase);

                newPhrase.Should().NotBeNull();
                newPhrase.ID.Should().NotBe(Guid.Empty);
                newPhrase.Text.Should().Be("test phrase");
                newPhrase.ProjectID.Should().Be(projectId);

                _context.Phrases.DeleteById(newPhrase.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var phrase = data.phrase1;
                phrase.Text = "updated";

                var updatedPhrase = _context.Phrases.UpdateById(phrase.ID, phrase);

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
                var phraseId = data.phrase1.ID;

                _context.Phrases.GetById(phraseId).Should().NotBeNull();
                _context.Translations.GetAllByPhraseId(phraseId).Should().NotBeEmpty();

                _context.Phrases.DeleteById(phraseId);

                _context.Phrases.GetById(phraseId).Should().BeNull();
                _context.Translations.GetAllByPhraseId(phraseId).Should().BeEmpty();
            }
        }
    }
}
