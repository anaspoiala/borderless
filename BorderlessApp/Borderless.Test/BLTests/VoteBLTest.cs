using System;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.BLTests
{
    [TestClass]
    public class VoteBLTest
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
                var votes = _context.Votes.GetAll();

                votes.Should().NotBeNullOrEmpty();
                votes.Should().HaveCountGreaterOrEqualTo(2);
            }
        }

        [TestMethod]
        public void CanReadById()
        {
            using (var data = new DbTestData())
            {
                var userId = data.user1.ID;
                var translationId = data.translation2.ID;
                var vote = _context.Votes.GetById(userId, translationId);

                vote.Should().NotBeNull();
                vote.IsUpvote.Should().BeTrue();
            }

        }

        [TestMethod]
        public void CanReadByTranslationId()
        {
            using (var data = new DbTestData())
            {
                var translationId = data.translation1.ID;
                var votes = _context.Votes.GetAllByTranslationId(translationId);

                votes.Should().NotBeNullOrEmpty();
                votes.Should().HaveCount(1);
            }
        }

        [TestMethod]
        public void CanReadByUserId()
        {
            using (var data = new DbTestData())
            {
                var userId = data.user1.ID;
                var votes = _context.Votes.GetAllByUserId(userId);

                votes.Should().NotBeNullOrEmpty();
                votes.Should().HaveCount(1);
            }
        }

        [TestMethod]
        public void CanAdd()
        {
            using (var data = new DbTestData())
            {
                Guid userId = data.user1.ID;
                Guid translationId = data.translation1.ID;

                _context.Votes.GetById(userId, translationId).Should().BeNull();

                var newVote = _context.Votes.Add(new Vote(userId, translationId, true));

                _context.Votes.GetById(userId, translationId).Should().NotBeNull();
                newVote.Should().NotBeNull();
                newVote.UserID.Should().Be(userId);
                newVote.TranslationID.Should().Be(translationId);
                newVote.IsUpvote.Should().BeTrue();

                _context.Votes.DeleteById(newVote.UserID, newVote.TranslationID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                Guid userId = data.user1.ID;
                Guid translationId = data.translation2.ID;

                var vote = _context.Votes.GetById(userId, translationId);
                vote.IsUpvote.Should().BeTrue();

                vote.IsUpvote = false;
                var updatedVote = _context.Votes.UpdateById(userId, translationId, vote);

                _context.Votes.GetById(userId, translationId).Should().NotBeNull();
                updatedVote.Should().NotBeNull();
                updatedVote.UserID.Should().Be(userId);
                updatedVote.TranslationID.Should().Be(translationId);
                updatedVote.IsUpvote.Should().BeFalse();
            }
        }

        [TestMethod]
        public void CanDelete()
        {
            using (var data = new DbTestData())
            {
                Guid userId = data.user1.ID;
                Guid translationId = data.translation2.ID;

                var deletedVote = _context.Votes.GetById(userId, translationId);
                deletedVote.Should().NotBeNull();

                _context.Votes.DeleteById(deletedVote.UserID, deletedVote.TranslationID);

                _context.Votes.GetById(userId, translationId).Should().BeNull();
            }
        }
    }
}
