using System;
using Borderless.BusinessLayer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentAssertions;

namespace Borderless.Test.BLTests
{
    [TestClass]
    public class BLContextTest
    {
        [TestMethod]
        public void PropertiesShouldNotBeNull()
        {
            var context = new BLContext();

            context.Users.Should().NotBeNull();
            context.Languages.Should().NotBeNull();
            context.Projects.Should().NotBeNull();
            context.Phrases.Should().NotBeNull();
            context.Translations.Should().NotBeNull();
            context.Votes.Should().NotBeNull();
        }
    }
}
