using System;
using Borderless.DataAccessLayer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentAssertions;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class DALContextTest
    {
        [TestMethod]
        public void PropertiesShouldNotBeNull()
        {
            var context = new DALContext();

            context.Users.Should().NotBeNull();
            context.Languages.Should().NotBeNull();
            context.Projects.Should().NotBeNull();
            context.Phrases.Should().NotBeNull();
            context.Translations.Should().NotBeNull();
            context.Votes.Should().NotBeNull();
        }
    }
}
