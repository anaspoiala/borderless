using System;
using System.Linq;
using Borderless.DataAccessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class UsersDALTest
    {
        [TestMethod]
        public void CanReadAll()
        {
            var dal = new UsersDAL();
            var users = dal.ReadAll();

            users.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void CanReadById()
        {
            var dal = new UsersDAL();
            var id = new Guid("53EAE69B-9343-4370-9BDF-484C8BBEFF0E");
            var user = dal.ReadById(id);

            user.Should().NotBeNull();
            user.Username.Should().Be("AnnikaRice");
            user.FirstName.Should().Be("Annika");
            user.LastName.Should().Be("Rice");
        }
    }
}
