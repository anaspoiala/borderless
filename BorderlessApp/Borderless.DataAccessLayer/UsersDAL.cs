using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class UsersDAL
    {
        private string _connectionString;

        public UsersDAL(string connectionString)
        {
            _connectionString = connectionString;
        }


        public List<User> ReadAll()
        {
            var result = new List<User>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.USERS_READ_ALL;

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetUser(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public User ReadById(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.USERS_READ_BY_ID;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetUser(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public User Add(User user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.USERS_ADD;
                    command.Parameters.Add(new SqlParameter("@Username", user.Username));
                    command.Parameters.Add(new SqlParameter("@PasswordHash", user.PasswordHash));
                    command.Parameters.Add(new SqlParameter("@FirstName", user.FirstName));
                    command.Parameters.Add(new SqlParameter("@LastName", user.LastName));
                    command.Parameters.Add(new SqlParameter("@Email", user.Email));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetUser(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public User UpdateById(Guid id, User user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.USERS_UPDATE;
                    command.Parameters.Add(new SqlParameter("@Id", id));
                    command.Parameters.Add(new SqlParameter("@Username", user.Username));
                    command.Parameters.Add(new SqlParameter("@PasswordHash", user.PasswordHash));
                    command.Parameters.Add(new SqlParameter("@FirstName", user.FirstName));
                    command.Parameters.Add(new SqlParameter("@LastName", user.LastName));
                    command.Parameters.Add(new SqlParameter("@Email", user.Email));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetUser(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public void DeleteById(Guid id)
        {
            // First delete Projects, Translations and Votes
            DeleteProjects(id);
            DeleteTranslations(id);
            DeleteVotes(id);

            // Then delete the User
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.USERS_DELETE;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    command.ExecuteNonQuery();
                }
            }
        }

        private void DeleteProjects(Guid userId)
        {
            var projectsDAL = new ProjectsDAL(_connectionString);
            var projects = projectsDAL.ReadByUserId(userId);

            foreach (var project in projects)
            {
                projectsDAL.DeleteById(project.ID);
            }
        }

        private void DeleteTranslations(Guid userId)
        {
            var translationsDAL = new TranslationsDAL(_connectionString);
            var translations = translationsDAL.ReadByUserId(userId);

            foreach (var translation in translations)
            {
                translationsDAL.DeleteById(translation.ID);
            }
        }

        private void DeleteVotes(Guid userId)
        {
            var votesDAL = new VotesDAL(_connectionString);
            var votes = votesDAL.ReadByUserId(userId);

            foreach(var vote in votes)
            {
                votesDAL.DeleteById(vote.UserID, vote.TranslationID);
            }
        }


    }
}
