using System;
using System.Collections.Generic;
using System.Linq;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Borderless.Test.DALTests
{

    [TestClass]
    public class ProjectsDALTest
    {
        private static ProjectsDAL dal;

        [ClassInitialize]
        public static void Init(TestContext context)
        {
            dal = new ProjectsDAL(DbTestData.ConnectionString);
        }

        [TestMethod]
        public void CanReadAll()
        {
            using (var data = new DbTestData())
            {
                var projects = dal.ReadAll();

                projects.Should().NotBeNullOrEmpty();
                projects.Should().HaveCountGreaterOrEqualTo(2);
            }
        }

        [TestMethod]
        public void CanReadById()
        {
            using (var data = new DbTestData())
            {
                var projectId = data.project1.ID;
                var project = dal.ReadById(projectId);

                project.Should().NotBeNull();
                project.Name.Should().Be(data.project1.Name);
                project.SourceLanguage.Name.Should().Be(data.language1.Name);
                project.TargetLanguages.Should().HaveCount(1);
                project.TargetLanguages[0].Should().BeEquivalentTo(data.language2);
            }
        }

        [TestMethod]
        public void CanReadByUserId()
        {
            using (var data = new DbTestData())
            {
                var userId = data.user1.ID;
                var projects = dal.ReadByUserId(userId);

                projects.Should().NotBeNullOrEmpty();
                projects.Should().HaveCountGreaterOrEqualTo(1);
            }
        }

        [TestMethod]
        public void CanAdd()
        {
            using (var data = new DbTestData())
            {
                var userId = data.user1.ID;
                var project = new Project(
                    Guid.Empty,
                    userId,
                    "Test project",
                    "no description",
                    data.language1,
                    new List<Language> { data.language2 }
                );

                var newProject = dal.Add(project);

                newProject.Should().NotBeNull();
                newProject.ID.Should().NotBe(Guid.Empty);
                newProject.Name.Should().Be("Test project");
                newProject.Description.Should().Be("no description");
                newProject.SourceLanguage.Should().BeEquivalentTo(data.language1);
                newProject.TargetLanguages.Should().NotBeNullOrEmpty();
                newProject.TargetLanguages.Should().HaveCount(1);
                newProject.TargetLanguages[0].Should().BeEquivalentTo(data.language2);

                dal.DeleteById(newProject.ID);
            }
        }

        [TestMethod]
        public void CanUpdate()
        {
            using (var data = new DbTestData())
            {
                var project = data.project1;
                
                // Update #1
                project.Name = "Updated";

                var updatedProject1 = dal.UpdateById(project.ID, project);

                updatedProject1.Should().NotBeNull();
                updatedProject1.ID.Should().NotBe(Guid.Empty);
                updatedProject1.Name.Should().Be("Updated");
                updatedProject1.Description.Should().Be(project.Description);
                updatedProject1.SourceLanguage.Should().BeEquivalentTo(data.language1);
                updatedProject1.TargetLanguages.Should().NotBeNullOrEmpty();
                updatedProject1.TargetLanguages.Should().HaveCount(1);
                updatedProject1.TargetLanguages[0].Should().BeEquivalentTo(data.language2);

                // Update #2
                project.TargetLanguages = new List<Language> { data.language1, data.language2 };

                var updatedProject2 = dal.UpdateById(project.ID, project);

                updatedProject2.Should().NotBeNull();
                updatedProject2.ID.Should().NotBe(Guid.Empty);
                updatedProject2.Name.Should().Be("Updated");
                updatedProject2.Description.Should().Be(project.Description);
                updatedProject2.SourceLanguage.Should().BeEquivalentTo(data.language1);
                updatedProject2.TargetLanguages.Should().NotBeNullOrEmpty();
                updatedProject2.TargetLanguages.Should().HaveCount(2);
                updatedProject2.TargetLanguages.Should().ContainEquivalentOf(data.language1); 
                updatedProject2.TargetLanguages.Should().ContainEquivalentOf(data.language2);
            }
        }

        [TestMethod]
        public void CanDelete()
        {
            using (var data = new DbTestData())
            {
                var phrasesDAL = new PhrasesDAL(DbTestData.ConnectionString);
                var project = data.project1;

                dal.ReadById(project.ID).Should().NotBeNull();
                phrasesDAL.ReadByProjectId(project.ID).Should().NotBeEmpty();

                dal.DeleteById(project.ID);

                dal.ReadById(project.ID).Should().BeNull();
                phrasesDAL.ReadByProjectId(project.ID).Should().BeEmpty();
            }
        }

    }
}
