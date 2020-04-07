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

            context.UserBL.Should().NotBeNull();
            context.LanguageBL.Should().NotBeNull();
            context.ProjectBL.Should().NotBeNull();
            context.PhraseBL.Should().NotBeNull();
            context.TranslationBL.Should().NotBeNull();
            context.VoteBL.Should().NotBeNull();
        }
    }
}
