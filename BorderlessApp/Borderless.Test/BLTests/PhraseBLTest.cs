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
                var phrases = _context.PhraseBL.ReadAll();

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
                var phrase = _context.PhraseBL.ReadById(id);

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
                var phrases = _context.PhraseBL.ReadByProjectId(projectId);

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

                var newPhrase = _context.PhraseBL.Add(phrase);

                newPhrase.Should().NotBeNull();
                newPhrase.ID.Should().NotBe(Guid.Empty);
                newPhrase.Text.Should().Be("test phrase");
                newPhrase.ProjectID.Should().Be(projectId);

                _context.PhraseBL.DeleteById(newPhrase.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var phrase = data.phrase1;
                phrase.Text = "updated";

                var updatedPhrase = _context.PhraseBL.UpdateById(phrase.ID, phrase);

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

                _context.PhraseBL.ReadById(phraseId).Should().NotBeNull();
                _context.TranslationBL.ReadByPhraseId(phraseId).Should().NotBeEmpty();

                _context.PhraseBL.DeleteById(phraseId);

                _context.PhraseBL.ReadById(phraseId).Should().BeNull();
                _context.TranslationBL.ReadByPhraseId(phraseId).Should().BeEmpty();
            }
        }
    }
}
