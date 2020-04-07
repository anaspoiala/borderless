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

            context.UsersDAL.Should().NotBeNull();
            context.LanguagesDAL.Should().NotBeNull();
            context.ProjectsDAL.Should().NotBeNull();
            context.PhrasesDAL.Should().NotBeNull();
            context.TranslationsDAL.Should().NotBeNull();
            context.VotesDAL.Should().NotBeNull();
        }
    }
}
