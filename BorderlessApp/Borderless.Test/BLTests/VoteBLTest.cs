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
                var votes = _context.VoteBL.ReadAll();

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
                var vote = _context.VoteBL.ReadById(userId, translationId);

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
                var votes = _context.VoteBL.ReadByTranslationId(translationId);

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
                var votes = _context.VoteBL.ReadByUserId(userId);

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

                _context.VoteBL.ReadById(userId, translationId).Should().BeNull();

                var newVote = _context.VoteBL.Add(new Vote(userId, translationId, true));

                _context.VoteBL.ReadById(userId, translationId).Should().NotBeNull();
                newVote.Should().NotBeNull();
                newVote.UserID.Should().Be(userId);
                newVote.TranslationID.Should().Be(translationId);
                newVote.IsUpvote.Should().BeTrue();

                _context.VoteBL.DeleteById(newVote.UserID, newVote.TranslationID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                Guid userId = data.user1.ID;
                Guid translationId = data.translation2.ID;

                var vote = _context.VoteBL.ReadById(userId, translationId);
                vote.IsUpvote.Should().BeTrue();

                vote.IsUpvote = false;
                var updatedVote = _context.VoteBL.UpdateById(userId, translationId, vote);

                _context.VoteBL.ReadById(userId, translationId).Should().NotBeNull();
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

                var deletedVote = _context.VoteBL.ReadById(userId, translationId);
                deletedVote.Should().NotBeNull();

                _context.VoteBL.DeleteById(deletedVote.UserID, deletedVote.TranslationID);

                _context.VoteBL.ReadById(userId, translationId).Should().BeNull();
            }
        }
    }
}
