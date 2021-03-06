﻿using System;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.BLTests
{
    [TestClass]
    public class UserBLTest
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
                var users = _context.Users.GetAll();

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
                var user = _context.Users.GetById(id);

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

                var newUser = _context.Users.Add(user);

                newUser.Should().NotBeNull();
                newUser.ID.Should().NotBe(Guid.Empty);
                newUser.Username.Should().Be("AddedUser");
                newUser.FirstName.Should().Be("Added");
                newUser.LastName.Should().Be("User");
                newUser.PasswordHash.Should().Be("8ee2027983915ec78acc45027d874316");
                newUser.Email.Should().Be("AddedUser@email.com");

                _context.Users.DeleteById(newUser.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var user = data.user1;
                user.FirstName = "Updated";

                _context.Users.GetById(user.ID).Should().NotBeNull();

                var updatedUser = _context.Users.UpdateById(user.ID, user);

                _context.Users.GetById(user.ID).Should().NotBeNull();
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
                var user = data.user1;

                _context.Users.GetById(user.ID).Should().NotBeNull();
                _context.Projects.GetAllByUserId(user.ID).Should().NotBeEmpty();
                _context.Translations.GetAllByUserId(user.ID).Should().NotBeEmpty();
                _context.Votes.GetAllByUserId(user.ID).Should().NotBeEmpty();

                _context.Users.DeleteById(user.ID);

                _context.Users.GetById(user.ID).Should().BeNull();
                _context.Projects.GetAllByUserId(user.ID).Should().BeEmpty();
                _context.Translations.GetAllByUserId(user.ID).Should().BeEmpty();
                _context.Votes.GetAllByUserId(user.ID).Should().BeEmpty();

            }
        }

    }
}
