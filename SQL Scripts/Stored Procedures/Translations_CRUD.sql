USE [BorderlessDb]
GO


-- ADD

ALTER PROCEDURE dbo.Translations_Add
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


-- UPDATE

ALTER PROCEDURE dbo.Translations_Update
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


-- DELETE

ALTER PROCEDURE dbo.Translations_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Translations]
	WHERE [ID] = @Id
END


-- READ BY ID

ALTER PROCEDURE dbo.Translations_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Translations] 
	WHERE [ID] = @Id 
END


-- READ BY PHRASE ID

ALTER PROCEDURE dbo.Translations_ReadByPhraseId
(
	@PhraseId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Translations] 
	WHERE [PhraseID] = @PhraseId 
END


-- READ BY PHRASE ID AND LANGUAGE ID

ALTER PROCEDURE dbo.Translations_ReadByPhraseIdAndLanguageId
(
	@PhraseId uniqueidentifier,
	@LanguageId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Translations] 
	WHERE [PhraseID] = @PhraseId AND [LanguageID] = @LanguageId
END



-- READ BY USER ID

CREATE PROCEDURE dbo.Translations_ReadByUserId
(
	@UserId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Translations] 
	WHERE [UserID] = @UserId 
END



-- READ ALL

ALTER PROCEDURE dbo.Translations_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Translations] 
END





-- DROP PROCEDURE dbo.Translations_Add;  
-- DROP PROCEDURE dbo.Translations_Update
-- DROP PROCEDURE dbo.Translations_Delete
-- DROP PROCEDURE dbo.Translations_ReadById  
-- DROP PROCEDURE dbo.Translations_ReadByPhraseId
-- DROP PROCEDURE dbo.Translations_ReadByPhraseIdAndLanguageId  
-- DROP PROCEDURE dbo.Translations_ReadAll  
 