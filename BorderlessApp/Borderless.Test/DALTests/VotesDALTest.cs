using System;
using System.Linq;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class VotesDALTest
    {
        private static VotesDAL dal;

        [ClassInitialize]
        public static void Init(TestContext context)
        {
            dal = new VotesDAL();
        }

        [TestMethod]
        public void CanReadAll()
        {
            using (var data = new DbTestData())
            {
                var votes = dal.ReadAll();

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
                var vote = dal.ReadById(userId, translationId);

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
                var votes = dal.ReadByTranslationId(translationId);

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

                dal.ReadById(userId, translationId).Should().BeNull();

                var newVote = dal.Add(new Vote(userId, translationId, true));

                dal.ReadById(userId, translationId).Should().NotBeNull();
                newVote.Should().NotBeNull();
                newVote.UserID.Should().Be(userId);
                newVote.TranslationID.Should().Be(translationId);
                newVote.IsUpvote.Should().BeTrue();

                dal.DeleteById(newVote.UserID, newVote.TranslationID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                Guid userId = data.user1.ID;
                Guid translationId = data.translation2.ID;

                var vote = dal.ReadById(userId, translationId);
                vote.IsUpvote.Should().BeTrue();

                vote.IsUpvote = false;
                var updatedVote = dal.UpdateById(userId, translationId, vote);

                dal.ReadById(userId, translationId).Should().NotBeNull();
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

                var deletedVote = dal.ReadById(userId, translationId);
                deletedVote.Should().NotBeNull();

                dal.DeleteById(deletedVote.UserID, deletedVote.TranslationID);

                dal.ReadById(userId, translationId).Should().BeNull();
            }
        }

    }
}
