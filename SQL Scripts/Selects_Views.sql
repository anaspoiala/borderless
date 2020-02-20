SELECT * FROM ProjectsPhrasesAndLanguages ppl
ORDER BY ppl.ProjectName, ppl.Phrase

SELECT * FROM [PhrasesAndTranslations] pht
ORDER BY pht.ProjectName, pht.Phrase, pht.Translation

SELECT * FROM [TranslationsAndVotes]
ORDER BY PhraseID, Translation