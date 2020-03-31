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
            using (var data = new DbTestData())
            {
                var users = dal.ReadAll();

                users.Should().NotBeNullOrEmpty();
                users.Should().HaveCountGreaterOrEqualTo(2);
            }
        }

        [TestMethod]
        public void CanReadById()
        {
            using (var data = new DbTestData())
            {
                var id = data.user1.ID;
                var user = dal.ReadById(id);

                user.Should().NotBeNull();
                user.Username.Should().Be(data.user1.Username);
                user.FirstName.Should().Be(data.user1.FirstName);
                user.LastName.Should().Be(data.user1.LastName);
            }
        }

        [TestMethod]
        public void CanAdd()
        {
            using (var data = new DbTestData())
            {
                var user = new User(
                    Guid.Empty,
                    "AddedUser",
                    "8ee2027983915ec78acc45027d874316",
                    "Added",
                    "User",
                    "AddedUser@email.com"
                );

                var newUser = dal.Add(user);

                newUser.Should().NotBeNull();
                newUser.ID.Should().NotBe(Guid.Empty);
                newUser.Username.Should().Be("AddedUser");
                newUser.FirstName.Should().Be("Added");
                newUser.LastName.Should().Be("User");
                newUser.PasswordHash.Should().Be("8ee2027983915ec78acc45027d874316");
                newUser.Email.Should().Be("AddedUser@email.com");

                dal.DeleteById(newUser.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var user = data.user1;
                user.FirstName = "Updated";

                dal.ReadById(user.ID).Should().NotBeNull();

                var updatedUser = dal.UpdateById(user.ID, user);

                dal.ReadById(user.ID).Should().NotBeNull();
                updatedUser.Should().NotBeNull();
                updatedUser.ID.Should().Be(data.user1.ID);
                updatedUser.Username.Should().Be(user.Username);
                updatedUser.FirstName.Should().Be("Updated");
                updatedUser.LastName.Should().Be(user.LastName);
                updatedUser.PasswordHash.Should().Be(user.PasswordHash);
                updatedUser.Email.Should().Be(user.Email);
            }
        }

        [TestMethod]
        public void CanDelete()
        {
            using (var data = new DbTestData())
            {
                var projectsDAL = new ProjectsDAL();
                var translationsDAL = new TranslationsDAL();
                var votesDAL = new VotesDAL();
                var user = data.user1;

                dal.ReadById(user.ID).Should().NotBeNull();
                projectsDAL.ReadByUserId(user.ID).Should().NotBeEmpty();
                translationsDAL.ReadByUserId(user.ID).Should().NotBeEmpty();
                votesDAL.ReadByUserId(user.ID).Should().NotBeEmpty();

                dal.DeleteById(user.ID);

                dal.ReadById(user.ID).Should().BeNull();
                projectsDAL.ReadByUserId(user.ID).Should().BeEmpty();
                translationsDAL.ReadByUserId(user.ID).Should().BeEmpty();
                votesDAL.ReadByUserId(user.ID).Should().BeEmpty();

            }
        }


    }
}
