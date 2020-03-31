using System.Collections.Generic;
using System.Data.SqlClient;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer.Helpers
{
    internal static class ModelConverter
    {
        public static Language GetLanguage(SqlDataReader dataReader)
        {
            return new Language(
                dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                dataReader.GetString(dataReader.GetOrdinal("Name")),
                dataReader.GetString(dataReader.GetOrdinal("Abbreviation"))
            );
        }

        public static User GetUser(SqlDataReader dataReader)
        {
            return new User(
                dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                dataReader.GetString(dataReader.GetOrdinal("Username")),
                dataReader.GetString(dataReader.GetOrdinal("PasswordHash")),
                dataReader.GetString(dataReader.GetOrdinal("FirstName")),
                dataReader.GetString(dataReader.GetOrdinal("LastName")),
                dataReader.GetString(dataReader.GetOrdinal("Email"))
            );
        }

        public static Project GetProject(SqlDataReader dataReader)
        {
            return new Project(
                id: dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                userId: dataReader.GetGuid(dataReader.GetOrdinal("UserID")),
                dataReader.GetString(dataReader.GetOrdinal("Name")),
                dataReader.GetString(dataReader.GetOrdinal("Description")),
                null,
                new List<Language>()
            );
        }

        public static Phrase GetPhrase(SqlDataReader dataReader)
        {
            return new Phrase(
                dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                dataReader.GetGuid(dataReader.GetOrdinal("ProjectID")),
                dataReader.GetString(dataReader.GetOrdinal("Text"))
            );
        }

        public static Translation GetTranslation(SqlDataReader dataReader)
        {
            return new Translation(
                dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                dataReader.GetString(dataReader.GetOrdinal("Text")),
                dataReader.GetGuid(dataReader.GetOrdinal("PhraseID")),
                dataReader.GetGuid(dataReader.GetOrdinal("LanguageID")),
                dataReader.GetGuid(dataReader.GetOrdinal("UserID"))
            );
        }

        internal static Vote GetVote(SqlDataReader dataReader)
        {
            return new Vote(
                dataReader.GetGuid(dataReader.GetOrdinal("UserID")),
                dataReader.GetGuid(dataReader.GetOrdinal("TranslationID")),
                dataReader.GetBoolean(dataReader.GetOrdinal("IsUpvote"))
            );
        }
    }
}
