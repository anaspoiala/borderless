USE [BorderlessDb]
GO


-- READ BY ID

ALTER PROCEDURE dbo.Languages_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Languages] 
	WHERE [ID] = @Id 
END


-- READ BY NAME

ALTER PROCEDURE dbo.Languages_ReadByName
(
	@Name varchar(50)
) 
AS
BEGIN
	SELECT * FROM [dbo].[Languages] 
	WHERE [Name] = @Name
END


-- READ ALL

ALTER PROCEDURE dbo.Languages_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Languages] 
END





-- DROP PROCEDURE dbo.Languages_ReadById
-- DROP PROCEDURE dbo.Languages_ReadAll