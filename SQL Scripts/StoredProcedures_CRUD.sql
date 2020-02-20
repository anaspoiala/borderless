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
	INSERT INTO [Users] ([ID], [Username], [PasswordHash], [FirstName], [LastName], [Email])
	VALUES 
	(NEWID(), @Username, @PasswordHash, @FirstName, @LastName, @Email)
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
	INSERT INTO [Projects] ([ID], [Name], [Description], [UserID], [SourceLanguageID])
	VALUES
	(NEWID(), @Name, @Description, @UserId, @SourceLanguageId)
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
END


CREATE PROCEDURE dbo.TargetLanguages_UpdateLanguage
(
	@ProjectId uniqueidentifier,
	@LanguageId uniqueidentifier
) 
AS
BEGIN
	UPDATE [dbo].[TargetLanguages]
	SET 
		[LanguageID] = @LanguageId
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
	INSERT INTO [dbo].[Phrases] ([ID], [Text], [ProjectID])
	VALUES
	(NEWID(), @Text, @ProjectId)
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
	INSERT INTO [dbo].[Translations] ([ID], [Text], [PhraseID], [LanguageID], [UserID])
	VALUES
	(NEWID(), @Text, @PhraseId, @LanguageId, @UserId)
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
END


-- CRUD for Languages -----------------------------------------------------------

CREATE PROCEDURE dbo.Languages_Add
(
	@Name varchar(50),
	@Abbreviation varchar(50)
) 
AS
BEGIN
	INSERT INTO [Languages] ([ID] ,[Name] ,[Abbreviation])
	VALUES
	(NEWID(), @Name, @Abbreviation)
END

CREATE PROCEDURE dbo.Languages_Update
(
	@Id uniqueidentifier,
	@Name varchar(50),
	@Abbreviation varchar(50)
) 
AS
BEGIN
	UPDATE [dbo].[Languages]
	SET 
		[Name] = @Name
		,[Abbreviation] = @Abbreviation
	WHERE [ID] = @Id
END



-------------- DROP Statements --------------

--DROP PROCEDURE dbo.Users_Add;  
--DROP PROCEDURE dbo.Projects_Add;  
--DROP PROCEDURE dbo.Languages_Add;  
--DROP PROCEDURE dbo.TargetLanguages_Add;  
--DROP PROCEDURE dbo.Phrases_Add;  
--DROP PROCEDURE dbo.Translations_Add;  
--DROP PROCEDURE dbo.Votes_Add;  
--GO  

--DROP PROCEDURE dbo.Users_Update
--DROP PROCEDURE dbo.Projects_Update
--DROP PROCEDURE dbo.Languages_Update
--DROP PROCEDURE dbo.TargetLanguages_UpdateLanguage 
--DROP PROCEDURE dbo.Phrases_UpdateText
--DROP PROCEDURE dbo.Translations_UpdateText
--DROP PROCEDURE dbo.Votes_UpdateIsUpvote
--GO  

---------------------------------------------