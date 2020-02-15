USE BorderlessDb
GO

-- Show all Projects and their source Language of al Users
SELECT 
	p.[Name] AS [ProjectName] , 
	u.Username,
	l.[Name] AS [SourceLanguage]
FROM Projects p 
	INNER JOIN Users u ON u.ID = p.UserID
	INNER JOIN Languages l ON l.ID = p.SourceLanguageID

-- Show all Target Languages of a Project
SELECT 
	p.[Name] AS [ProjectName],
	l1.[Name] AS [SourceLanguage],
	l2.[Name] AS [TargetLanguage]
FROM Projects p
	INNER JOIN TargetLanguages tl1 ON tl1.ProjectID = p.ID
	INNER JOIN Languages l1 ON l1.ID = p.SourceLanguageID	-- to get the source language
	INNER JOIN Languages l2 ON l2.ID = tl1.LanguageID		-- to get the target languages
ORDER BY p.[Name]

-- Show all Phrases of a Project
SELECT 
	p.[Name] AS [ProjectName],
	ph.[Text] AS [Phrase]
FROM Projects p
	INNER JOIN Phrases ph ON ph.ProjectID = p.ID
ORDER BY p.[Name], ph.[Text]

-- Show all Phrases and their respective Translations
SELECT 
	ph.[Text] AS [Phrase],
	t.[Text] AS [Translation]
FROM Phrases ph
	INNER JOIN Translations t ON t.PhraseID = ph.ID
ORDER BY ph.[Text]

-- Show all Phrases, their respective Translations and their Target Languages
SELECT 
	ph.[Text] AS [Phrase],
	t.[Text] AS [Translation],
	l.[Name] AS [TargetLanguage]
FROM Phrases ph
	INNER JOIN Translations t ON t.PhraseID = ph.ID
	INNER JOIN Languages l ON l.ID = t.LanguageID
ORDER BY ph.[Text]

-- Show the number of Votes for each Translation of a Phrase
SELECT 
	ph.[Text] AS [Phrase], 
	t.[Text] AS [Translation], 
	SUM(CAST(v.IsUpvote AS int) * 2 - 1) AS [NumberOfVotes] -- Offset the values from [0,1] to [-1,1]
FROM Phrases ph
	INNER JOIN Translations t ON t.PhraseID = ph.ID
	INNER JOIN Votes v ON v.TranslationID = t.ID
GROUP BY ph.[Text], t.[Text]
ORDER BY ph.[Text]

-- Show all Translations witten by a User
SELECT
	u.[Username],
	p.[Text] AS [Phrase],
	t.[Text] AS [Translation]
FROM Users u
	INNER JOIN Translations t ON t.UserID = u.ID
	INNER JOIN Phrases p  ON p.ID = t.PhraseID
ORDER BY u.Username

-- Show all Votes given by a User
SELECT
	u.[Username],
	v.[IsUpvote],
	t.[Text] AS [Translation]
FROM Votes v
	INNER JOIN Users u ON u.ID = v.UserID
	INNER JOIN Translations t ON t.ID = v.TranslationID
ORDER BY u.Username

-- Show the Translations with 3 or more Votes
SELECT 
	ph.[Text] AS [Phrase], 
	t.[Text] AS [Translation], 
	SUM(CAST(v.IsUpvote AS int) * 2 - 1) AS [NumberOfVotes] -- Offset the values from [0,1] to [-1,1]
FROM Phrases ph
	INNER JOIN Translations t ON t.PhraseID = ph.ID
	INNER JOIN Votes v ON v.TranslationID = t.ID
GROUP BY ph.[Text], t.[Text]
HAVING SUM(CAST(v.IsUpvote AS int) * 2 - 1) > 2
ORDER BY ph.[Text]

-- Show the top 1 Translations of a Phrase (with at least 1 Vote)
SELECT TOP 1
	ph.[Text] AS [Phrase], 
	t.[Text] AS [Translation], 
	SUM(CAST(v.IsUpvote AS int) * 2 - 1) AS [NumberOfVotes] -- Offset the values from [0,1] to [-1,1]
FROM Phrases ph
	INNER JOIN Translations t ON t.PhraseID = ph.ID
	INNER JOIN Votes v ON v.TranslationID = t.ID
	INNER JOIN Languages l ON l.ID = t.LanguageID
WHERE ph.[Text] = 'rattling sound' AND l.[Name] = 'Italian'
GROUP BY ph.[Text], t.[Text]
HAVING SUM(CAST(v.IsUpvote AS int) * 2 - 1) > 0
ORDER BY [NumberOfVotes] DESC
