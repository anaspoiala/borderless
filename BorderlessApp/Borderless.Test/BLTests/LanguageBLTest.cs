using Borderless.BusinessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.BLTests
{
    [TestClass]
    public class LanguageBLTest
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
            var languages = _context.LanguageBL.ReadAll();

            languages.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void CanReadById()
        {
            using (var data = new DbTestData())
            {
                var id = data.language2.ID;
                var language = _context.LanguageBL.ReadById(id);

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
                var language = _context.LanguageBL.ReadByName("English");

                language.Should().NotBeNull();
                language.Name.Should().Be("English");
                language.Abbreviation.Should().Be("en");
            }
        }
    }
}
