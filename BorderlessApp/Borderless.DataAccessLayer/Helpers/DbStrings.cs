namespace Borderless.DataAccessLayer.Helpers
{
    internal class DbStrings
    {
        public const string CONNECTION_STRING = @"Server=DESKTOP-52CJKGG\SQLEXPRESS;Database=BorderlessDb;Trusted_Connection=True;";

        public const string USERS_READ_ALL = "dbo.Users_ReadAll";
        public const string USERS_READ_BY_ID = "dbo.Users_ReadById";

        public const string PROJECTS_READ_ALL = "dbo.Projects_ReadAll";
        public const string PROJECTS_READ_BY_ID = "dbo.Projects_ReadById";

        public const string PHRASES_READ_ALL = "dbo.Phrases_ReadAll";
        public const string PHRASES_READ_BY_ID = "dbo.Phrases_ReadById";
        public const string PHRASES_READ_BY_PROJECT_ID = "dbo.Phrases_ReadByProjectId";

        public const string TRANSLATIONS_READ_ALL = "dbo.Translations_ReadAll";
        public const string TRANSLATIONS_READ_BY_ID = "dbo.Translations_ReadById";
        public const string TRANSLATIONS_READ_BY_PHRASE_ID = "dbo.Translations_ReadByPhraseId";
        public const string TRANSLATIONS_READ_BY_PHRASE_ID_AND_LANGUAGE_ID = "dbo.Translations_ReadByPhraseIdAndLanguageId";

        public const string VOTES_READ_ALL = "dbo.Votes_ReadAll";
        public const string VOTES_READ_BY_ID = "dbo.Votes_ReadById";
        public const string VOTES_READ_BY_TRANSLATION_ID = "dbo.Votes_ReadByTranslationId";

        public const string LANGUAGES_READ_ALL = "dbo.Languages_ReadAll";
        public const string LANGUAGES_READ_BY_ID = "dbo.Languages_ReadById";

        public const string TARGET_LANGUAGES_READ_ALL_BY_PROJECT_ID = "dbo.TargetLanguages_ReadByProjectId";
    }
}
