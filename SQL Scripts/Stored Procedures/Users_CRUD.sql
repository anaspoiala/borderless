USE [BorderlessDb]
GO


-- ADD

ALTER PROCEDURE dbo.Users_Add
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

	SELECT * FROM [dbo].[Users] WHERE [ID] = @Id 
END


-- UPDATE

ALTER PROCEDURE dbo.Users_Update
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


-- DELETE

ALTER PROCEDURE dbo.Users_Delete
(
	@Id uniqueidentifier
) 
AS
BEGIN
	DELETE FROM [dbo].[Users]
	WHERE [ID] = @Id
END


-- READ BY ID

ALTER PROCEDURE dbo.Users_ReadById
(
	@Id uniqueidentifier
) 
AS
BEGIN
	SELECT * FROM [dbo].[Users] 
	WHERE [ID] = @Id 
END


-- READ BY USERNAME

ALTER PROCEDURE dbo.Users_ReadByUsername
(
	@Username varchar(50)
) 
AS
BEGIN
	SELECT * FROM [dbo].[Users] 
	WHERE [Username] = @Username 
END


-- READ ALL

ALTER PROCEDURE dbo.Users_ReadAll
AS
BEGIN
	SELECT * FROM [dbo].[Users]
END





-- DROP PROCEDURE dbo.Users_Add
-- DROP PROCEDURE dbo.Users_Update
-- DROP PROCEDURE dbo.Users_Delete
-- DROP PROCEDURE dbo.Users_ReadById
-- DROP PROCEDURE dbo.Users_ReadAll