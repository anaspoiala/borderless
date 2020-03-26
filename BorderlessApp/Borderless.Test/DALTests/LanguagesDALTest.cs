using System;
using System.Linq;
using Borderless.DataAccessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class LanguagesDALTest
    {
        [TestMethod]
        public void LanguagesDAL_CanReadAll()
        {
            var dal = new LanguagesDAL();
            var languages = dal.ReadAll();

            languages.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void LanguagesDAL_CanReadById()
        {
            var dal = new LanguagesDAL();
            var id = new Guid("24653028-8AE0-47FE-B4B5-046C904C56DE");
            var language = dal.ReadById(id);

            language.Should().NotBeNull();
            language.Name.Should().Be("German");
            language.Abbreviation.Should().Be("de");
        }
    }
}
