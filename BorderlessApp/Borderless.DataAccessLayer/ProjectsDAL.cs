using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class ProjectsDAL
    {
        public List<Project> ReadAll()
        {
            var result = new List<Project>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
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
                            result.Add(GetProjectWithLanguages(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Project ReadById(Guid id)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
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
                            return GetProjectWithLanguages(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public Project Add(Project project)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
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
                            return ModelConverter.GetProject(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public Project UpdateById(Guid projectId, Project project)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_UPDATE;
                    command.Parameters.Add(new SqlParameter("@Id", projectId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetProject(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public void DeleteById(Guid projectId)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PROJECTS_DELETE;
                    command.Parameters.Add(new SqlParameter("@Id", projectId));

                    command.ExecuteNonQuery();
                }
            }
        }

        private Project GetProjectWithLanguages(SqlDataReader dataReader)
        {
            var project = ModelConverter.GetProject(dataReader);
            project.SourceLanguage = GetSourceLanguage(dataReader);
            project.TargetLanguages = ReadAllTargetLanguagesByProjectId(project.ID);

            return project;
        }

        private Language GetSourceLanguage(SqlDataReader dataReader)
        {
            var languageDAL = new LanguagesDAL();
            var sourceLanguageId = dataReader.GetGuid(dataReader.GetOrdinal("SourceLanguageID"));
            var sourceLanguage = languageDAL.ReadById(sourceLanguageId);
            return sourceLanguage;
        }

        private List<Language> ReadAllTargetLanguagesByProjectId(Guid projectId)
        {
            var result = new List<Language>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
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
                        while (dataReader.Read())
                        {
                            result.Add(GetLanguageFromTargetLanguage(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        private Language GetLanguageFromTargetLanguage(SqlDataReader dataReader)
        {
            var languagesDal = new LanguagesDAL();
            var guid = dataReader.GetGuid(dataReader.GetOrdinal("LanguageID"));

            return languagesDal.ReadById(guid);
        }
    }
}
