using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class VotesDAL
    {
        public List<Vote> ReadAll()
        {
            var result = new List<Vote>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
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
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
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

        public List<Vote> ReadByTranslationId(Guid translationId)
        {
            var result = new List<Vote>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
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
    }
}
