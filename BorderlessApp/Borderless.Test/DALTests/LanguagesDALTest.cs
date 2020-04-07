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
        private static LanguagesDAL dal;

        [ClassInitialize]
        public static void Init(TestContext context)
        {
            dal = new LanguagesDAL(DbTestData.ConnectionString);
        }

        [TestMethod]
        public void CanReadAll()
        {
            var languages = dal.ReadAll();

            languages.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void CanReadById()
        {
            using (var data = new DbTestData())
            {
                var id = data.language2.ID;
                var language = dal.ReadById(id);

                language.Should().NotBeNull();
                language.Name.Should().Be("German");
                language.Abbreviation.Should().Be("de");
            }
        }

        [TestMethod]
        public void CanReadByName()
        {
            using (var data = new DbTestData())
            {
                var language = dal.ReadByName("English");

                language.Should().NotBeNull();
                language.Name.Should().Be("English");
                language.Abbreviation.Should().Be("en");
            }
        }
    }
}
