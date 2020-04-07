using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class LanguagesDAL
    {
        private string _connectionString;

        public LanguagesDAL(string connectionString)
        {
            _connectionString = connectionString;
        }


        public List<Language> ReadAll()
        {
            var result = new List<Language>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.LANGUAGES_READ_ALL;

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetLanguage(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Language ReadById(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.LANGUAGES_READ_BY_ID;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetLanguage(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public Language ReadByName(string name)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.LANGUAGES_READ_BY_NAME;
                    command.Parameters.Add(new SqlParameter("@Name", name));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetLanguage(dataReader);
                        }
                    }
                }
            }

            return null;
        }
    }
}
