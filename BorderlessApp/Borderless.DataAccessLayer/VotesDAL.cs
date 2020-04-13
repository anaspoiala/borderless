using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class VotesDAL
    {
        private string _connectionString;

        public VotesDAL(string connectionString)
        {
            _connectionString = connectionString;
        }


        public List<Vote> ReadAll()
        {
            var result = new List<Vote>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.VOTES_READ_ALL;

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetVote(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Vote ReadById(Guid userId, Guid translationId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.VOTES_READ_BY_ID;
                    command.Parameters.Add(new SqlParameter("@UserId", userId));
                    command.Parameters.Add(new SqlParameter("@TranslationId", translationId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetVote(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public List<Vote> ReadAllByTranslationId(Guid translationId)
        {
            var result = new List<Vote>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.VOTES_READ_BY_TRANSLATION_ID;
                    command.Parameters.Add(new SqlParameter("@TranslationId", translationId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetVote(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public List<Vote> ReadAllByUserId(Guid userId)
        {
            var result = new List<Vote>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.VOTES_READ_BY_USER_ID;
                    command.Parameters.Add(new SqlParameter("@UserId", userId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetVote(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Vote Add(Vote vote)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.VOTES_ADD;
                    command.Parameters.Add(new SqlParameter("@UserID", vote.UserID));
                    command.Parameters.Add(new SqlParameter("@TranslationID", vote.TranslationID));
                    command.Parameters.Add(new SqlParameter("@IsUpvote", vote.IsUpvote));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetVote(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public Vote UpdateById(Guid userId, Guid translationId, Vote vote)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.VOTES_UPDATE;
                    command.Parameters.Add(new SqlParameter("@UserID", userId));
                    command.Parameters.Add(new SqlParameter("@TranslationID", translationId));
                    command.Parameters.Add(new SqlParameter("@IsUpvote", vote.IsUpvote));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetVote(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public void DeleteById(Guid userId, Guid translationId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.VOTES_DELETE;
                    command.Parameters.Add(new SqlParameter("@UserID", userId));
                    command.Parameters.Add(new SqlParameter("@TranslationID", translationId));

                    command.ExecuteNonQuery();
                }
            }
        }

    }
}
