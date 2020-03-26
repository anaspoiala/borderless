using System;
using System.Linq;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class UsersDALTest
    {
        private static UsersDAL dal;

        [ClassInitialize]
        public static void Init(TestContext context)
        {
            dal = new UsersDAL();
        }

        [TestMethod]
        public void CanReadAll()
        {
            var users = dal.ReadAll();

            users.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void CanReadById()
        {
            var id = new Guid("53EAE69B-9343-4370-9BDF-484C8BBEFF0E");
            var user = dal.ReadById(id);

            user.Should().NotBeNull();
            user.Username.Should().Be("AnnikaRice");
            user.FirstName.Should().Be("Annika");
            user.LastName.Should().Be("Rice");
        }

        [TestMethod]
        public void CanAddUpdateAndDelete()
        {
            var dummy = new User(
                Guid.Empty,
                "DummyUser",
                "8ee2027983915ec78acc45027d874316",
                "Dummy",
                "User",
                "DummyUser@email.com"
            );

            // Add
            var newUser = dal.Add(dummy);
            var id = newUser.ID;

            newUser.Should().NotBeNull();
            newUser.ID.Should().NotBe(Guid.Empty);
            newUser.Username.Should().Be("DummyUser");
            newUser.FirstName.Should().Be("Dummy"); 
            newUser.LastName.Should().Be("User"); 
            newUser.PasswordHash.Should().Be("8ee2027983915ec78acc45027d874316"); 
            newUser.Email.Should().Be("DummyUser@email.com");

            // Update
            dummy.Username = "DummyUserChanged";
            var updateUser = dal.UpdateById(id, dummy);

            updateUser.Should().NotBeNull();
            updateUser.ID.Should().Be(id);
            updateUser.Username.Should().Be("DummyUserChanged");
            updateUser.FirstName.Should().Be("Dummy");
            updateUser.LastName.Should().Be("User");
            updateUser.PasswordHash.Should().Be("8ee2027983915ec78acc45027d874316");
            updateUser.Email.Should().Be("DummyUser@email.com");

            // Delete
            dal.DeleteById(id);

            dal.ReadById(id).Should().BeNull();
        }


    }
}
