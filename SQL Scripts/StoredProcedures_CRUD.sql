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




-------------- DROP Statements --------------

--DROP PROCEDURE dbo.Users_Add;  
--DROP PROCEDURE dbo.Projects_Add;  
--DROP PROCEDURE dbo.Languages_Add;  
--DROP PROCEDURE dbo.TargetLanguages_Add;  
--DROP PROCEDURE dbo.Phrases_Add;  
--DROP PROCEDURE dbo.Translations_Add;  
--DROP PROCEDURE dbo.Votes_Add;  
--GO  

---------------------------------------------