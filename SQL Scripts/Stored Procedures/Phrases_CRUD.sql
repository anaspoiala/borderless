USE [BorderlessDb]
GO


-- ADD

ALTER PROCEDURE dbo.Phrases_Add
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


-- UPDATE

ALTER PROCEDURE dbo.Phrases_Update
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


-- DELETE

ALTER PROCEDURE dbo.Phrases_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Phrases]
	WHERE [ID] = @Id
END


-- DELETE BY PROJECT ID

ALTER PROCEDURE dbo.Phrases_DeleteByProjectId
(
	@ProjectId uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Phrases]
	WHERE [ProjectID] = @ProjectId
END


-- READ BY ID

ALTER PROCEDURE dbo.Phrases_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Phrases] 
	WHERE [ID] = @Id 
END


-- READ BY PROJECT ID

ALTER PROCEDURE dbo.Phrases_ReadByProjectId
(
	@ProjectId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Phrases] 
	WHERE [ProjectID] = @ProjectId 
END


-- READ ALL

ALTER PROCEDURE dbo.Phrases_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Phrases] 
END





-- DROP PROCEDURE dbo.Phrases_Add
-- DROP PROCEDURE dbo.Phrases_Update
-- DROP PROCEDURE dbo.Phrases_Delete
-- DROP PROCEDURE dbo.Phrases_ReadById
-- DROP PROCEDURE dbo.Phrases_ReadByProjectId
-- DROP PROCEDURE dbo.Phrases_ReadAll