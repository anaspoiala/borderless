using System;
using System.Linq;
using Borderless.DataAccessLayer;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{
    [TestClass]
    public class PhrasesDALTest
    {
        [TestMethod]
        public void CanReadAll()
        {
            var dal = new PhrasesDAL();
            var phrases = dal.ReadAll();

            phrases.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void CanReadById()
        {
            var dal = new PhrasesDAL();
            var id = new Guid("2AD88467-8113-4F2E-9659-454C03B95329");
            var phrase = dal.ReadById(id);

            phrase.Should().NotBeNull();
            phrase.Text.Should().Be("a pained expression");
            phrase.ProjectID.Should().Be(new Guid("2147B59C-B856-42A6-A811-63286354D7C9"));
        }

        [TestMethod]
        public void CanReadByProjectId()
        {
            var dal = new PhrasesDAL();
            var projectId = new Guid("2147B59C-B856-42A6-A811-63286354D7C9");
            var phrases = dal.ReadByProjectId(projectId);

            phrases.Should().NotBeNullOrEmpty();
            phrases.Should().HaveCount(6);
            phrases.Where(p => p.Text == "a pained expression").Should().NotBeNullOrEmpty();
        }
    }
}
