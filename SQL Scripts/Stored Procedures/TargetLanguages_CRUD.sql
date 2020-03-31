USE [BorderlessDb]
GO


-- ADD

ALTER PROCEDURE dbo.TargetLanguages_Add
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


-- DELETE

ALTER PROCEDURE dbo.TargetLanguages_Delete
(
	@ProjectId uniqueidentifier,
	@LanguageId uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId AND [LanguageID] = @LanguageId
END


-- DELETE BY PROJECT ID

ALTER PROCEDURE dbo.TargetLanguages_DeleteByProjectId
(
	@ProjectId uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId
END


-- READ BY ID

ALTER PROCEDURE dbo.TargetLanguages_ReadById
(
	@ProjectId uniqueidentifier,
	@LanguageId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId AND [LanguageID] = @LanguageId
END


-- READ ALL

ALTER PROCEDURE dbo.TargetLanguages_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[TargetLanguages]
END


-- READ BY PROJECT ID

ALTER PROCEDURE [dbo].[TargetLanguages_ReadByProjectId]
(
	@ProjectId uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[TargetLanguages]
	WHERE [ProjectID] = @ProjectId
END





-- DROP PROCEDURE dbo.TargetLanguages_Add
-- DROP PROCEDURE dbo.TargetLanguages_Delete
-- DROP PROCEDURE dbo.TargetLanguages_ReadById 
-- DROP PROCEDURE dbo.TargetLanguages_ReadByProjectId 
-- DROP PROCEDURE dbo.TargetLanguages_ReadAll 