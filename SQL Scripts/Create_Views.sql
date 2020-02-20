CREATE VIEW [dbo].[ProjectsPhrasesAndLanguages]
AS
SELECT 
	p.ID AS ProjectID,
	p.[Name] AS ProjectName, 
	p.[Description] AS ProjectDescription, 
	l.[Name] AS SourceLanguage, 
	ph.ID AS PhraseID,
	ph.Text AS Phrase
FROM Phrases ph
	INNER JOIN Projects p ON ph.ProjectID = p.ID 
	INNER JOIN Languages l ON p.SourceLanguageID = l.ID
GO


CREATE VIEW [dbo].[PhrasesAndTranslations]
AS
SELECT
	p.ID AS ProjectID, 
	p.[Name] AS ProjectName, 
	l1.[Name] AS SourceLanguage, 
	l.[Name] AS TargetLanguage, 
	ph.ID AS PhraseID, 
    ph.[Text] AS Phrase, 
	t.ID AS TranslationID, 
	t.[Text] AS Translation, 
	u.ID AS UserID, 
	u.Username
FROM Translations t
	INNER JOIN Languages l ON t.LanguageID = l.ID 
	INNER JOIN Phrases ph ON t.PhraseID = ph.ID 
	INNER JOIN Users u ON t.UserID = u.ID 
	INNER JOIN Projects p ON ph.ProjectID = p.ID 
	INNER JOIN Languages l1 ON p.SourceLanguageID = l1.ID
GO


CREATE VIEW [dbo].[TranslationsAndVotes]
AS
SELECT        
	t.PhraseID, 
	l.[Name] AS TargetLanguage, 
	t.ID AS TranslationID, 
	t.[Text] AS Translation, 
	author.ID AS AuthorID,
	author.Username AS AuthorUsername, 
	voter.ID AS VoterID, 
	voter.Username AS VoterUsername, 
	v.IsUpvote
FROM dbo.Languages l
	INNER JOIN dbo.Translations t ON l.ID = t.LanguageID 
	INNER JOIN dbo.Users author ON t.UserID = author.ID 
	INNER JOIN dbo.Votes v ON t.ID = v.TranslationID 
	INNER JOIN dbo.Users voter ON v.UserID = voter.ID
GO



--DROP VIEW [dbo].[ProjectsPhrasesAndLanguages]
--DROP VIEW [dbo].[PhrasesAndTranslations]
--DROP VIEW [dbo].[TranslationsAndVotes]