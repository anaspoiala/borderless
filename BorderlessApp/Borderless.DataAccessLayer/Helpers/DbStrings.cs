namespace Borderless.DataAccessLayer.Helpers
{
    internal class DbStrings
    {
        public const string USERS_READ_ALL = "dbo.Users_ReadAll";
        public const string USERS_READ_BY_ID = "dbo.Users_ReadById";
        public const string USERS_ADD = "dbo.Users_Add";
        public const string USERS_UPDATE = "dbo.Users_Update";
        public const string USERS_DELETE = "dbo.Users_Delete";

        public const string PROJECTS_READ_ALL = "dbo.Projects_ReadAll";
        public const string PROJECTS_READ_BY_ID = "dbo.Projects_ReadById";
        public const string PROJECTS_READ_BY_USER_ID = "dbo.Projects_ReadByUserId";
        public const string PROJECTS_ADD = "dbo.Projects_Add";
        public const string PROJECTS_UPDATE = "dbo.Projects_Update";
        public const string PROJECTS_DELETE = "dbo.Projects_Delete";

        public const string PHRASES_READ_ALL = "dbo.Phrases_ReadAll";
        public const string PHRASES_READ_BY_ID = "dbo.Phrases_ReadById";
        public const string PHRASES_READ_BY_PROJECT_ID = "dbo.Phrases_ReadByProjectId";
        public const string PHRASES_ADD = "dbo.Phrases_Add";
        public const string PHRASES_UPDATE = "dbo.Phrases_Update";
        public const string PHRASES_DELETE = "dbo.Phrases_Delete";

        public const string TRANSLATIONS_READ_ALL = "dbo.Translations_ReadAll";
        public const string TRANSLATIONS_READ_BY_ID = "dbo.Translations_ReadById";
        public const string TRANSLATIONS_READ_BY_USER_ID = "dbo.Translations_ReadByUserId";
        public const string TRANSLATIONS_READ_BY_PHRASE_ID = "dbo.Translations_ReadByPhraseId";
        public const string TRANSLATIONS_READ_BY_PHRASE_ID_AND_LANGUAGE_ID = "dbo.Translations_ReadByPhraseIdAndLanguageId";
        public const string TRANSLATIONS_ADD = "dbo.Translations_Add";
        public const string TRANSLATIONS_UPDATE = "dbo.Translations_Update";
        public const string TRANSLATIONS_DELETE = "dbo.Translations_Delete";

        public const string VOTES_READ_ALL = "dbo.Votes_ReadAll";
        public const string VOTES_READ_BY_ID = "dbo.Votes_ReadById";
        public const string VOTES_READ_BY_USER_ID = "dbo.Votes_ReadByUserId";
        public const string VOTES_READ_BY_TRANSLATION_ID = "dbo.Votes_ReadByTranslationId";
        public const string VOTES_ADD = "dbo.Votes_Add";
        public const string VOTES_UPDATE = "dbo.Votes_Update";
        public const string VOTES_DELETE = "dbo.Votes_Delete";

        public const string LANGUAGES_READ_ALL = "dbo.Languages_ReadAll";
        public const string LANGUAGES_READ_BY_ID = "dbo.Languages_ReadById";
        public const string LANGUAGES_READ_BY_NAME = "dbo.Languages_ReadByName";

        public const string TARGET_LANGUAGES_READ_ALL_BY_PROJECT_ID = "dbo.TargetLanguages_ReadByProjectId";
        public const string TARGET_LANGUAGES_ADD = "dbo.TargetLanguages_Add";
        public const string TARGET_LANGUAGES_DELETE = "dbo.TargetLanguages_Delete";
        public const string TARGET_LANGUAGES_DELETE_BY_PROJECT_ID = "dbo.TargetLanguages_DeleteByProjectId";
    }
}
