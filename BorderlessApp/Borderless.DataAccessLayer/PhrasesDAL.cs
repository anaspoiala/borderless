using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class PhrasesDAL
    {
        private string _connectionString;

        public PhrasesDAL(string connectionString)
        {
            _connectionString = connectionString;
        }


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
            using (var connection = new SqlConnection(_connectionString))
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

            using (var connection = new SqlConnection(_connectionString))
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

        public Phrase Add(Phrase phrase)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PHRASES_ADD;
                    command.Parameters.Add(new SqlParameter("@Text", phrase.Text));
                    command.Parameters.Add(new SqlParameter("@ProjectId", phrase.ProjectID));

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

        public Phrase UpdateById(Guid id, Phrase phrase)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PHRASES_UPDATE;
                    command.Parameters.Add(new SqlParameter("@Id", id));
                    command.Parameters.Add(new SqlParameter("@Text", phrase.Text));

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

        public void DeleteById(Guid id)
        {
            // First delete Translations
            DeleteTranslations(id);

            // Then delete the Phrase
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.PHRASES_DELETE;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    command.ExecuteNonQuery();
                }
            }
        }

        private void DeleteTranslations(Guid phraseId)
        {
            var translationsDAL = new TranslationsDAL(_connectionString);
            var translations = translationsDAL.ReadByPhraseId(phraseId);

            foreach(var translation in translations)
            {
                translationsDAL.DeleteById(translation.ID);
            }
        }
    }
}
