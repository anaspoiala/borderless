using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class PhrasesDAL
    {
        private const string _connectionString = @"Server=DESKTOP-52CJKGG\SQLEXPRESS;Database=BorderlessDb;Trusted_Connection=True;";
        private const string READ_ALL = "dbo.Phrases_ReadAll";
        private const string READ_BY_ID = "dbo.Phrases_ReadById";


        public List<Phrase> ReadAll()
        {
            var result = new List<Phrase>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = READ_ALL;

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(GetModel(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Phrase ReadById(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = READ_BY_ID;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return GetModel(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        private static Phrase GetModel(SqlDataReader dataReader)
        {
            return new Phrase(
                dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                dataReader.GetGuid(dataReader.GetOrdinal("ProjectID")),
                dataReader.GetString(dataReader.GetOrdinal("Text"))
            );
        }
    }
}
