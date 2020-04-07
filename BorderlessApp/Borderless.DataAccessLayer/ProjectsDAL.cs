using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class ProjectsDAL
    {
        private string _connectionString;

        public ProjectsDAL(string connectionString)
        {
            _connectionString = connectionString;
        }


        public List<Project> ReadAll()
        {
            var result = new List<Project>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_READ_ALL;

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(GetProjectWithSourceAndTargetLanguages(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Project ReadById(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_READ_BY_ID;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return GetProjectWithSourceAndTargetLanguages(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public List<Project> ReadByUserId(Guid userId)
        {
            var result = new List<Project>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_READ_BY_USER_ID;
                    command.Parameters.Add(new SqlParameter("@UserId", userId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(GetProjectWithSourceAndTargetLanguages(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Project Add(Project project)
        {
            Project addedProject = null;

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_ADD;
                    command.Parameters.Add(new SqlParameter("@Name", project.Name));
                    command.Parameters.Add(new SqlParameter("@Description", project.Description));
                    command.Parameters.Add(new SqlParameter("@UserId", project.UserID));
                    command.Parameters.Add(new SqlParameter("@SourceLanguageId", project.SourceLanguage.ID));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            addedProject = ModelConverter.GetProject(dataReader);
                            AddTargetLanguages(project.TargetLanguages, addedProject.ID);
                            addedProject = GetProjectWithSourceAndTargetLanguages(dataReader);
                        }
                    }
                }
            }

            return addedProject;
        }

        public Project UpdateById(Guid projectId, Project project)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_UPDATE;
                    command.Parameters.Add(new SqlParameter("@Id", projectId));
                    command.Parameters.Add(new SqlParameter("@Name", project.Name));
                    command.Parameters.Add(new SqlParameter("@Description", project.Description));
                    command.Parameters.Add(new SqlParameter("@SourceLanguageId", project.SourceLanguage.ID));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            DeleteTargetLanguagesByProjectId(projectId);
                            AddTargetLanguages(project.TargetLanguages, projectId);
                            return GetProjectWithSourceAndTargetLanguages(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public void DeleteById(Guid projectId)
        {
            // First delete all Phrases of the given project.
            DeletePhrases(projectId);

            // Then delete the Project and TargetLanguages
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_DELETE;
                    command.Parameters.Add(new SqlParameter("@Id", projectId));

                    DeleteTargetLanguagesByProjectId(projectId);

                    command.ExecuteNonQuery();
                }
            }
        }

        /// <summary>
        /// Converts the result from the SqlDataReader into a Project, 
        /// retrieves its SourceLanguage and list of TargetLanguages and returns it.
        /// </summary>
        private Project GetProjectWithSourceAndTargetLanguages(SqlDataReader dataReader)
        {
            var project = ModelConverter.GetProject(dataReader);
            project.SourceLanguage = GetSourceLanguageFromDataReader(dataReader);
            project.TargetLanguages = ReadTargetLanguagesByProjectId(project.ID);

            return project;
        }

        private Language GetSourceLanguageFromDataReader(SqlDataReader dataReader)
        {
            var languageDAL = new LanguagesDAL(_connectionString);
            var sourceLanguageId = dataReader.GetGuid(dataReader.GetOrdinal("SourceLanguageID"));
            var sourceLanguage = languageDAL.ReadById(sourceLanguageId);
            return sourceLanguage;
        }

        private List<Language> ReadTargetLanguagesByProjectId(Guid projectId)
        {
            var result = new List<Language>();
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TARGET_LANGUAGES_READ_ALL_BY_PROJECT_ID;
                    command.Parameters.Add(new SqlParameter("@ProjectId", projectId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        var languagesDal = new LanguagesDAL(_connectionString);

                        while (dataReader.Read())
                        {
                            var guid = dataReader.GetGuid(dataReader.GetOrdinal("LanguageID"));
                            result.Add(languagesDal.ReadById(guid));
                        }
                    }
                }
            }
            return result;
        }

        private void AddTargetLanguages(List<Language> targetLanguages, Guid projectId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                foreach (var targetLanguage in targetLanguages)
                {
                    using (var command = new SqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.CommandText = DbStrings.TARGET_LANGUAGES_ADD;
                        command.Parameters.Add(new SqlParameter("@ProjectId", projectId));
                        command.Parameters.Add(new SqlParameter("@LanguageId", targetLanguage.ID));

                        command.ExecuteNonQuery();
                    }
                }
            }
        }

        private void DeleteTargetLanguagesByProjectId(Guid projectId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TARGET_LANGUAGES_DELETE_BY_PROJECT_ID;
                    command.Parameters.Add(new SqlParameter("@ProjectId", projectId));

                    command.ExecuteNonQuery();
                }
            }
        }

        private void DeletePhrases(Guid projectId)
        {
            var phrasesDAL = new PhrasesDAL(_connectionString);
            var phrasesInThisProject = phrasesDAL.ReadByProjectId(projectId);

            foreach (var phrase in phrasesInThisProject)
            {
                phrasesDAL.DeleteById(phrase.ID);
            }
        }

    }
}
