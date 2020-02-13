-- Create database
IF EXISTS(SELECT * FROM sys.databases WHERE name='BorderlessDb')
	DROP DATABASE BorderlessDb
CREATE DATABASE BorderlessDb;

-- Create Tables

USE [BorderlessDb];

CREATE TABLE [Users] (
	[ID] uniqueidentifier NOT NULL,
	[Username] varchar(50) NOT NULL,
	[Password] varchar(32) NOT NULL,
	[FirstName] varchar(50) NOT NULL,
	[LastName] varchar(50) NOT NULL,
	[Email] varchar(100),
CONSTRAINT [PK_Users] PRIMARY KEY ([ID])
);

CREATE TABLE [Languages] (
	[ID] uniqueidentifier NOT NULL,
	[Name] varchar(50) NOT NULL,
	[Abbreviation] varchar(50) NOT NULL,
CONSTRAINT [PK_Languages] PRIMARY KEY ([ID])
);

CREATE TABLE [Projects] (
	[ID] uniqueidentifier NOT NULL,
	[Name] varchar(100) NOT NULL,
	[Description] varchar(1000),
	[UserID] uniqueidentifier NOT NULL,
	[SourceLanguageID] uniqueidentifier NOT NULL,  -- one source language for the project
CONSTRAINT [PK_Projects] PRIMARY KEY ([ID]),
CONSTRAINT [FK_Projects_User] FOREIGN KEY ([UserID]) REFERENCES [Users]([ID]),
CONSTRAINT [FK_Projects_Language] FOREIGN KEY ([SourceLanguageID]) REFERENCES [Languages]([ID])
);

CREATE TABLE [TargetLanguages] (  -- join table between Projects and Languages (translations to many languages)
	[ProjectID] uniqueidentifier NOT NULL,
	[LanguageID] uniqueidentifier NOT NULL,
CONSTRAINT [PK_TargetLanguages] PRIMARY KEY ([ProjectID], [LanguageID]),
CONSTRAINT [FK_Projects_TargetLanguages] FOREIGN KEY ([ProjectID]) REFERENCES [Projects]([ID]),
CONSTRAINT [FK_Languages_TargetLanguages] FOREIGN KEY ([LanguageID]) REFERENCES [Languages]([ID])
);

CREATE TABLE [Phrases] (
	[ID] uniqueidentifier NOT NULL,
	[Text] varchar(500) NOT NULL,
	[ProjectID] uniqueidentifier NOT NULL,
CONSTRAINT [PK_Phrases] PRIMARY KEY ([ID]),
CONSTRAINT [FK_Phrases_Project] FOREIGN KEY ([ProjectID]) REFERENCES [Projects]([ID])
);

CREATE TABLE [Translations] (
	[ID] uniqueidentifier NOT NULL,
	[Text] varchar(500) NOT NULL,
	[PhraseID] uniqueidentifier NOT NULL,
	[LanguageID] uniqueidentifier NOT NULL,
CONSTRAINT [PK_Translations] PRIMARY KEY ([ID]),
CONSTRAINT [FK_Translations_Phrase] FOREIGN KEY ([PhraseID]) REFERENCES [Phrases]([ID]),
CONSTRAINT [FK_Translations_Language] FOREIGN KEY ([LanguageID]) REFERENCES [Languages]([ID])
);

CREATE TABLE [Votes] (  -- join table between Translations and Users
	[UserID] uniqueidentifier NOT NULL,
	[TranslationID] uniqueidentifier NOT NULL,
	[IsUpvote] bit NOT NULL,
CONSTRAINT [PK_Votes] PRIMARY KEY ([UserID], [TranslationID]),
CONSTRAINT [FK_Votes_Users] FOREIGN KEY ([UserID]) REFERENCES [Users]([ID]),
CONSTRAINT [FK_Votes_Translations] FOREIGN KEY ([TranslationID]) REFERENCES [Translations]([ID])
);

--DROP TABLE Votes;
--DROP TABLE Translations;
--DROP TABLE Phrases;
--DROP TABLE TargetLanguages;
--DROP TABLE Projects;
--DROP TABLE Languages;
--DROP TABLE Users;