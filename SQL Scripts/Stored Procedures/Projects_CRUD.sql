USE [BorderlessDb]
GO


-- ADD

ALTER PROCEDURE dbo.Projects_Add
(
	@Name nvarchar(250),
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


-- UPDATE

ALTER PROCEDURE dbo.Projects_Update
(
	@Id uniqueidentifier,
	@Name nvarchar(250),
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


-- DELETE

ALTER PROCEDURE dbo.Projects_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Projects]
	WHERE [ID] = @Id
END


-- DELETE BY USER ID

CREATE PROCEDURE dbo.Projects_DeleteByUserId
(
	@UserId uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Projects]
	WHERE [UserID] = @UserId
END

-- READ BY ID

ALTER PROCEDURE dbo.Projects_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Projects] 
	WHERE [ID] = @Id 
END


-- READ BY USER ID

CREATE PROCEDURE dbo.Projects_ReadByUserId
(
	@UserId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Projects] 
	WHERE [UserID] = @UserId 
END


-- READ ALL

ALTER PROCEDURE dbo.Projects_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Projects] 
END





-- DROP PROCEDURE dbo.Projects_Add 
-- DROP PROCEDURE dbo.Projects_Update
-- DROP PROCEDURE dbo.Projects_Delete
-- DROP PROCEDURE dbo.Projects_ReadById
-- DROP PROCEDURE dbo.Projects_ReadAll