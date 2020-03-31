USE [BorderlessDb]
GO


-- ADD

ALTER PROCEDURE dbo.Votes_Add
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


-- UPDATE

ALTER PROCEDURE dbo.Votes_Update
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


-- DELETE

ALTER PROCEDURE dbo.Votes_Delete
(
	@UserId uniqueidentifier,
	@TranslationId uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Votes]
	WHERE [UserID] = @UserId AND [TranslationID] = @TranslationId
END


-- READ BY ID

ALTER PROCEDURE dbo.Votes_ReadById
(
	@UserId uniqueidentifier,
	@TranslationId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Votes]
	WHERE [UserID] = @UserId AND [TranslationID] = @TranslationId
END


-- READ BY TRANSLATION ID

ALTER PROCEDURE dbo.Votes_ReadByTranslationId
(
	@TranslationId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Votes]
	WHERE [TranslationID] = @TranslationId
END


-- READ BY USER ID

CREATE PROCEDURE dbo.Votes_ReadByUserId
(
	@UserId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Votes]
	WHERE [UserID] = @UserId
END


-- READ ALL

ALTER PROCEDURE dbo.Votes_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Votes]
END





-- DROP PROCEDURE dbo.Votes_Add
-- DROP PROCEDURE dbo.Votes_Update
-- DROP PROCEDURE dbo.Votes_Delete
-- DROP PROCEDURE dbo.Votes_ReadById
-- DROP PROCEDURE dbo.Votes_ReadByTranslationId
-- DROP PROCEDURE dbo.Votes_ReadAll