USE [BorderlessDb]
GO

-- CRUD for Users -----------------------------------------------------------

CREATE PROCEDURE dbo.Users_Add
(
	@Username varchar(50),
	@PasswordHash varchar(500),
	@FirstName varchar(50),
	@LastName varchar(50),
	@Email varchar(50)
) 
AS
BEGIN
	DECLARE @Id uniqueidentifier = NEWID();

	INSERT INTO [Users] ([ID], [Username], [PasswordHash], [FirstName], [LastName], [Email])
	VALUES 
	(@Id, @Username, @PasswordHash, @FirstName, @LastName, @Email)

	SELECT * FROM [dbo].[Users] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Users_Update
(
	@Id uniqueidentifier,
	@Username varchar(50),
	@PasswordHash varchar(500),
	@FirstName varchar(50),
	@LastName varchar(50),
	@Email varchar(50)
) 
AS
BEGIN
	UPDATE [dbo].[Users]
	SET 
		[Username] = @Username
		,[PasswordHash] = @PasswordHash
		,[FirstName] = @FirstName
		,[LastName] = @LastName
		,[Email] = @Email
	WHERE [ID] = @Id

	SELECT * FROM [dbo].[Users] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Users_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Users]
	WHERE [ID] = @Id
END

CREATE PROCEDURE dbo.Users_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Users] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Users_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Users]
END

-- CRUD for Projects -----------------------------------------------------------

CREATE PROCEDURE dbo.Projects_Add
(
	@Name varchar(250),
	@Description nvarchar(1000),
	@UserId uniqueidentifier,
	@SourceLanguageId uniqueidentifier
) 
AS
BEGIN
	DECLARE @Id uniqueidentifier = NEWID();

	INSERT INTO [Projects] ([ID], [Name], [Description], [UserID], [SourceLanguageID])
	VALUES
	(@Id, @Name, @Description, @UserId, @SourceLanguageId)

	SELECT * FROM [dbo].[Projects] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Projects_Update
(
	@Id uniqueidentifier,
	@Name varchar(250),
	@Description nvarchar(1000),
	@SourceLanguageId uniqueidentifier
) 
AS
BEGIN
	UPDATE [dbo].[Projects]
	SET 
		[Name] = @Name
		,[Description] = @Description
		,[SourceLanguageID] = @SourceLanguageId
	WHERE [ID] = @Id

	SELECT * FROM [dbo].[Projects] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Projects_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Projects]
	WHERE [ID] = @Id
END

CREATE PROCEDURE dbo.Projects_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Projects] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Projects_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Projects] 
END



-- CRUD for TargetLanguages -----------------------------------------------------------

CREATE PROCEDURE dbo.TargetLanguages_Add
(
	@ProjectId uniqueidentifier,
	@LanguageId uniqueidentifier
) 
AS
BEGIN
	INSERT INTO [TargetLanguages] ([ProjectID], [LanguageID])
	VALUES
	(@ProjectId, @LanguageId)

	SELECT * FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId AND [LanguageID] = @LanguageId
END

CREATE PROCEDURE dbo.TargetLanguages_Delete
(
	@ProjectId uniqueidentifier,
	@LanguageId uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId AND [LanguageID] = @LanguageId
END

CREATE PROCEDURE dbo.TargetLanguages_ReadById
(
	@ProjectId uniqueidentifier,
	@LanguageId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId AND [LanguageID] = @LanguageId
END

CREATE PROCEDURE dbo.TargetLanguages_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[TargetLanguages]
END

CREATE PROCEDURE [dbo].[TargetLanguages_ReadByProjectId]
(
	@ProjectId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId
END

-- CRUD for Phrases -----------------------------------------------------------

CREATE PROCEDURE dbo.Phrases_Add
(
	@Text nvarchar(500),
	@ProjectId uniqueidentifier
) 
AS
BEGIN
	DECLARE @Id uniqueidentifier = NEWID();

	INSERT INTO [dbo].[Phrases] ([ID], [Text], [ProjectID])
	VALUES
	(@Id, @Text, @ProjectId)

	SELECT * FROM [dbo].[Phrases] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Phrases_UpdateText
(
	@Id uniqueidentifier,
	@Text nvarchar(500)
) 
AS
BEGIN
	UPDATE [dbo].[Phrases]
	SET 
		[Text] = @Text
	WHERE [ID] = @Id

	SELECT * FROM [dbo].[Phrases] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Phrases_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Phrases]
	WHERE [ID] = @Id
END

CREATE PROCEDURE dbo.Phrases_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Phrases] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Phrases_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Phrases] 
END

-- CRUD for Translations -----------------------------------------------------------

CREATE PROCEDURE dbo.Translations_Add
(
	@Text nvarchar(500),
	@PhraseId uniqueidentifier,
	@LanguageId uniqueidentifier,
	@UserId uniqueidentifier
) 
AS
BEGIN
	DECLARE @Id uniqueidentifier = NEWID();

	INSERT INTO [dbo].[Translations] ([ID], [Text], [PhraseID], [LanguageID], [UserID])
	VALUES
	(@Id, @Text, @PhraseId, @LanguageId, @UserId)

	SELECT * FROM [dbo].[Translations]
	WHERE [ID] = @Id
END

CREATE PROCEDURE dbo.Translations_UpdateText
(
	@Id uniqueidentifier,
	@Text nvarchar(500)
) 
AS
BEGIN
	UPDATE [dbo].[Translations]
	SET 
		[Text] = @Text
	WHERE [ID] = @Id

	SELECT * FROM [dbo].[Translations]
	WHERE [ID] = @Id
END

CREATE PROCEDURE dbo.Translations_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Translations]
	WHERE [ID] = @Id
END

CREATE PROCEDURE dbo.Translations_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Translations] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Translations_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Translations] 
END


-- CRUD for Votes -----------------------------------------------------------

CREATE PROCEDURE dbo.Votes_Add
(
	@UserId uniqueidentifier,
	@TranslationId uniqueidentifier,
	@IsUpvote bit
) 
AS
BEGIN
	INSERT INTO [dbo].[Votes] ([UserID], [TranslationID], [IsUpvote])
	VALUES
	(@UserId, @TranslationId, @IsUpvote)

	SELECT * FROM [dbo].[Votes] v
	WHERE v.UserID = @UserId AND v.TranslationID = @TranslationId
END

CREATE PROCEDURE dbo.Votes_UpdateIsUpvote
(
	@UserId uniqueidentifier,
	@TranslationId uniqueidentifier,
	@IsUpvote bit
) 
AS
BEGIN
	UPDATE [dbo].[Votes]
	SET 
		[IsUpvote] = @IsUpvote
	WHERE [UserID] = @UserId AND [TranslationID] = @TranslationId

	SELECT * FROM [dbo].[Votes] v
	WHERE v.UserID = @UserId AND v.TranslationID = @TranslationId
END

CREATE PROCEDURE dbo.Votes_Delete
(
	@UserId uniqueidentifier,
	@TranslationId uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Votes]
	WHERE [UserID] = @UserId AND [TranslationID] = @TranslationId
END

CREATE PROCEDURE dbo.Votes_ReadById
(
	@UserId uniqueidentifier,
	@TranslationId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Votes]
	WHERE [UserID] = @UserId AND [TranslationID] = @TranslationId
END

CREATE PROCEDURE dbo.Votes_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Votes]
END

-- CRUD for Languages -----------------------------------------------------------

CREATE PROCEDURE dbo.Languages_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Languages] 
	WHERE [ID] = @Id 
END

CREATE PROCEDURE dbo.Languages_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Languages] 
END


-------------- DROP Statements --------------

--DROP PROCEDURE dbo.Users_Add;  
--DROP PROCEDURE dbo.Projects_Add;  
--DROP PROCEDURE dbo.TargetLanguages_Add;  
--DROP PROCEDURE dbo.Phrases_Add;  
--DROP PROCEDURE dbo.Translations_Add;  
--DROP PROCEDURE dbo.Votes_Add;  
--GO  

--DROP PROCEDURE dbo.Users_Update
--DROP PROCEDURE dbo.Projects_Update
--DROP PROCEDURE dbo.Phrases_UpdateText
--DROP PROCEDURE dbo.Translations_UpdateText
--DROP PROCEDURE dbo.Votes_UpdateIsUpvote
--GO  

--DROP PROCEDURE dbo.Users_Delete;  
--DROP PROCEDURE dbo.Projects_Delete;  
--DROP PROCEDURE dbo.TargetLanguages_Delete;  
--DROP PROCEDURE dbo.Phrases_Delete;  
--DROP PROCEDURE dbo.Translations_Delete;  
--DROP PROCEDURE dbo.Votes_Delete;  
--GO  

--DROP PROCEDURE dbo.Users_ReadById;  
--DROP PROCEDURE dbo.Projects_ReadById;  
--DROP PROCEDURE dbo.Languages_ReadById;  
--DROP PROCEDURE dbo.TargetLanguages_ReadById;  
--DROP PROCEDURE dbo.TargetLanguages_ReadByProjectId;  
--DROP PROCEDURE dbo.Phrases_ReadById;  
--DROP PROCEDURE dbo.Translations_ReadById;  
--DROP PROCEDURE dbo.Votes_ReadById;  
--GO  

--DROP PROCEDURE dbo.Users_ReadAll;  
--DROP PROCEDURE dbo.Projects_ReadAll;  
--DROP PROCEDURE dbo.Languages_ReadAll;  
--DROP PROCEDURE dbo.TargetLanguages_ReadAll;  
--DROP PROCEDURE dbo.Phrases_ReadAll;  
--DROP PROCEDURE dbo.Translations_ReadAll;  
--DROP PROCEDURE dbo.Votes_ReadAll;  
--GO  

---------------------------------------------