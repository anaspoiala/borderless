using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.DataAccessLayer.Helpers;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer
{
    public class TranslationsDAL
    {
        public List<Translation> ReadAll()
        {
            var result = new List<Translation>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TRANSLATIONS_READ_ALL;

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetTranslation(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Translation ReadById(Guid id)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TRANSLATIONS_READ_BY_ID;
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetTranslation(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public List<Translation> ReadByPhraseId(Guid phraseId)
        {
            var result = new List<Translation>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TRANSLATIONS_READ_BY_PHRASE_ID;
                    command.Parameters.Add(new SqlParameter("@PhraseId", phraseId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetTranslation(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public List<Translation> ReadByPhraseIdAndLanguageId(Guid phraseId, Guid languageId)
        {
            var result = new List<Translation>();

            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TRANSLATIONS_READ_BY_PHRASE_ID_AND_LANGUAGE_ID;
                    command.Parameters.Add(new SqlParameter("@PhraseId", phraseId));
                    command.Parameters.Add(new SqlParameter("@LanguageId", languageId));

                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            result.Add(ModelConverter.GetTranslation(dataReader));
                        }
                    }
                }
            }

            return result;
        }

        public Translation Add(Translation translation)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TRANSLATIONS_ADD;
                    command.Parameters.Add(new SqlParameter("@Text", translation.Text));
                    command.Parameters.Add(new SqlParameter("@PhraseId", translation.PhraseID));
                    command.Parameters.Add(new SqlParameter("@LanguageId", translation.LanguageID));
                    command.Parameters.Add(new SqlParameter("@UserId", translation.UserID));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetTranslation(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public Translation UpdateById(Guid id, Translation translation)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TRANSLATIONS_UPDATE;
                    command.Parameters.Add(new SqlParameter("@Id", id));
                    command.Parameters.Add(new SqlParameter("@Text", translation.Text));

                    using (var dataReader = command.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            return ModelConverter.GetTranslation(dataReader);
                        }
                    }
                }
            }

            return null;
        }

        public void DeleteById(Guid id)
        {
            using (var connection = new SqlConnection(DbStrings.CONNECTION_STRING))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = DbStrings.TRANSLATIONS_DELETE;
                    command.Parameters.Add(new SqlParameter("@Id", id));
                    
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
