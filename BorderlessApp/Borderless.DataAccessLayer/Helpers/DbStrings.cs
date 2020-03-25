namespace Borderless.DataAccessLayer.Helpers
{
    internal class DbStrings
    {
        public const string CONNECTION_STRING = @"Server=DESKTOP-52CJKGG\SQLEXPRESS;Database=BorderlessDb;Trusted_Connection=True;";

        public const string PROJECTS_READ_ALL = "dbo.Projects_ReadAll";
        public const string PROJECTS_READ_BY_ID = "dbo.Projects_ReadById";

        public const string LANGUAGES_READ_ALL = "dbo.Languages_ReadAll";
        public const string LANGUAGES_READ_BY_ID = "dbo.Languages_ReadById";

        public const string TARGET_LANGUAGES_READ_ALL_BY_PROJECT_ID = "dbo.TargetLanguages_ReadByProjectId";
    }
}
