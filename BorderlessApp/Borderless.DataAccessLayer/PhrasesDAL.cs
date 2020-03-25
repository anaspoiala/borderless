using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class PhrasesDAL
    {
        public List<Phrase> ReadAll()
        {
            var result = new List<Phrase>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PHRASES_READ_ALL;

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetPhrase(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Phrase ReadById(Guid id)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PHRASES_READ_BY_ID;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetPhrase(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public List<Phrase> ReadByProjectId(Guid projectId)
        {
            var result = new List<Phrase>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PHRASES_READ_BY_PROJECT_ID;
                    command.Parameters.Add(new SqlParameter("@ProjectId", projectId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetPhrase(dataReader));
                        }
                    }
                }
            }

            return result;
        }

    }
}
