using System.Data.SqlClient;
using Borderless.Model.Entities;

namespace Borderless.DataAccessLayer.Helpers
{
    internal static class ModelConverter
    {
        public static Project GetProject(SqlDataReader dataReader)
        {
            return new Project(
                id: dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                userId: dataReader.GetGuid(dataReader.GetOrdinal("UserID")),
                dataReader.GetString(dataReader.GetOrdinal("Name")),
                dataReader.GetString(dataReader.GetOrdinal("Description")),
                null,
                null
            );
        }

        public static Language GetLanguage(SqlDataReader dataReader)
        {
            return new Language(
                dataReader.GetGuid(dataReader.GetOrdinal("ID")),
                dataReader.GetString(dataReader.GetOrdinal("Name")),
                dataReader.GetString(dataReader.GetOrdinal("Abbreviation"))
            );
        }
    }
}
