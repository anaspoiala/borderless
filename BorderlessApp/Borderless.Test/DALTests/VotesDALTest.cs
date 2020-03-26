using System;
using System.Linq;
using Borderless.DataAccessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class VotesDALTest
    {
        [TestMethod]
        public void VotesDAL_CanReadAll()
        {
            var dal = new VotesDAL();
            var votes = dal.ReadAll();

            votes.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void VotesDAL_CanReadById()
        {
            var dal = new VotesDAL();
            var userId = new Guid("953D23D7-72D7-4C2A-9CC7-BF6FE8676094");
            var translationId = new Guid("BB6502D2-8608-4A64-8F11-9A04DB11F1CB");
            var vote = dal.ReadById(userId, translationId);

            vote.Should().NotBeNull();
            vote.IsUpvote.Should().BeTrue();
        }

        [TestMethod]
        public void VotesDAL_CanReadByTranslationId()
        {
            var dal = new VotesDAL();
            var translationId = new Guid("BB6502D2-8608-4A64-8F11-9A04DB11F1CB");
            var votes = dal.ReadByTranslationId(translationId);

            votes.Should().NotBeNullOrEmpty();
            votes.Should().HaveCount(3);
        }
    }
}
