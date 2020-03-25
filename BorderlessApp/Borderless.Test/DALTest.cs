using System;
using System.Linq;
using Borderless.DataAccessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test
{
    [TestClass]
    public class DALTest
    {
        [TestMethod]
        public void LanguagesDAL_CanReadAll()
        {
            var dal = new LanguagesDAL();
            var languages = dal.ReadAll();

            languages.Should().NotBeNull();
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

        [TestMethod]
        public void ProjectsDAL_CanReadAll()
        {
            var dal = new ProjectsDAL();
            var projects = dal.ReadAll();

            projects.Should().NotBeNull();
        }

        [TestMethod]
         public void ProjectsDAL_CanReadById()
        {
            var dal = new ProjectsDAL();
            var id = new Guid("2147B59C-B856-42A6-A811-63286354D7C9");
            var project = dal.ReadById(id);

            project.Should().NotBeNull();
            project.Name.Should().Be("Mastersky Game");
            project.SourceLanguage.Name.Should().Be("English");
            project.TargetLanguages.Should().HaveCount(3);
            project.TargetLanguages
                .Where(l => l.Name == "German" || l.Name == "Japanese" || l.Name == "French").ToList()
                .Should().HaveCount(3);
        }
    }
}
