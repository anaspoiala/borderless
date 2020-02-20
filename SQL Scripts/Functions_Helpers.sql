USE [BorderlessDb]
GO

CREATE FUNCTION dbo.Users_UsernameExists
(
	@Username varchar(50)
)
RETURNS bit
AS
BEGIN
	IF EXISTS (SELECT * FROM [Users] WHERE [Username] = @Username)
		RETURN 1
	RETURN 0
END
GO

--SELECT dbo.Users_UsernameExists('AnnikaRice')
--SELECT dbo.Users_UsernameExists('AnnikaRicee')


CREATE FUNCTION dbo.Translations_GetNumberOfVotes
(
	@TranslationId uniqueidentifier
)
RETURNS int
AS
BEGIN
	DECLARE @numOfVotes int = 0;

	SET @numOfVotes = (
		SELECT 
			SUM(CAST(v.IsUpvote AS int) * 2 - 1)
		FROM Translations t 
			INNER JOIN Votes v ON v.TranslationID = t.ID
		WHERE t.ID = @TranslationId
	);

	RETURN @numOfVOtes;
END
GO

--SELECT dbo.Translations_GetNumberOfVotes('D7473354-ED42-4514-88C4-FF5FC778A4B0')