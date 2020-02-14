-- Insert into Languages
USE [BorderlessDb]
GO

DELETE FROM Votes;
DELETE FROM Translations;
DELETE FROM Phrases;
DELETE FROM TargetLanguages;
DELETE FROM Projects;
DELETE FROM Languages;
DELETE FROM Users;

INSERT INTO [Languages] ([ID] ,[Name] ,[Abbreviation])
VALUES
(NEWID(), '(Afan) Oromo', 'om'),
(NEWID(), 'Abkhazian', 'ab'),
(NEWID(), 'Afar', 'aa'),
(NEWID(), 'Afrikaans', 'af'),
(NEWID(), 'Albanian', 'sq'),
(NEWID(), 'Amharic', 'am'),
(NEWID(), 'Arabic', 'ar'),
(NEWID(), 'Armenian', 'hy'),
(NEWID(), 'Assamese', 'as'),
(NEWID(), 'Aymara', 'ay'),
(NEWID(), 'Azerbaijani', 'az'),
(NEWID(), 'Bashkir', 'ba'),
(NEWID(), 'Basque', 'eu'),
(NEWID(), 'Bengali', 'bn'),
(NEWID(), 'Bhutani', 'dz'),
(NEWID(), 'Bihari', 'bh'),
(NEWID(), 'Bislama', 'bi'),
(NEWID(), 'Breton', 'br'),
(NEWID(), 'Bulgarian', 'bg'),
(NEWID(), 'Burmese', 'my'),
(NEWID(), 'Byelorussian', 'be'),
(NEWID(), 'Cambodian', 'km'),
(NEWID(), 'Catalan', 'ca'),
(NEWID(), 'Chinese', 'zh'),
(NEWID(), 'Corsican', 'co'),
(NEWID(), 'Croatian', 'hr'),
(NEWID(), 'Czech', 'cs'),
(NEWID(), 'Danish', 'da'),
(NEWID(), 'Dutch', 'nl'),
(NEWID(), 'English', 'en'),
(NEWID(), 'Esperanto', 'eo'),
(NEWID(), 'Estonian', 'et'),
(NEWID(), 'Faeroese', 'fo'),
(NEWID(), 'Fiji', 'fj'),
(NEWID(), 'Finnish', 'fi'),
(NEWID(), 'French', 'fr'),
(NEWID(), 'Frisian', 'fy'),
(NEWID(), 'Galician', 'gl'),
(NEWID(), 'Georgian', 'ka'),
(NEWID(), 'German', 'de'),
(NEWID(), 'Greek', 'el'),
(NEWID(), 'Greenlandic', 'kl'),
(NEWID(), 'Guarani', 'gn'),
(NEWID(), 'Gujarati', 'gu'),
(NEWID(), 'Hausa', 'ha'),
(NEWID(), 'Hebrew (former iw)', 'he'),
(NEWID(), 'Hindi', 'hi'),
(NEWID(), 'Hungarian', 'hu'),
(NEWID(), 'Icelandic', 'is'),
(NEWID(), 'Indonesian (former in)', 'id'),
(NEWID(), 'Interlingua', 'ia'),
(NEWID(), 'Interlingue', 'ie'),
(NEWID(), 'Inupiak', 'ik'),
(NEWID(), 'Inuktitut (Eskimo)', 'iu'),
(NEWID(), 'Irish', 'ga'),
(NEWID(), 'Italian', 'it'),
(NEWID(), 'Japanese', 'ja'),
(NEWID(), 'Javanese', 'jw'),
(NEWID(), 'Kannada', 'kn'),
(NEWID(), 'Kashmiri', 'ks'),
(NEWID(), 'Kazakh', 'kk'),
(NEWID(), 'Kinyarwanda', 'rw'),
(NEWID(), 'Kirghiz', 'ky'),
(NEWID(), 'Kirundi', 'rn'),
(NEWID(), 'Korean', 'ko'),
(NEWID(), 'Kurdish', 'ku'),
(NEWID(), 'Laothian', 'lo'),
(NEWID(), 'Latin', 'la'),
(NEWID(), 'Latvian, Lettish', 'lv'),
(NEWID(), 'Lingala', 'ln'),
(NEWID(), 'Lithuanian', 'lt'),
(NEWID(), 'Macedonian', 'mk'),
(NEWID(), 'Malagasy', 'mg'),
(NEWID(), 'Malay', 'ms'),
(NEWID(), 'Malayalam', 'ml'),
(NEWID(), 'Maltese', 'mt'),
(NEWID(), 'Maori', 'mi'),
(NEWID(), 'Marathi', 'mr'),
(NEWID(), 'Moldavian', 'mo'),
(NEWID(), 'Mongolian', 'mn'),
(NEWID(), 'Nauru', 'na'),
(NEWID(), 'Nepali', 'ne'),
(NEWID(), 'Norwegian', 'no'),
(NEWID(), 'Occitan', 'oc'),
(NEWID(), 'Oriya', 'or'),
(NEWID(), 'Pashto, Pushto', 'ps'),
(NEWID(), 'Persian', 'fa'),
(NEWID(), 'Polish', 'pl'),
(NEWID(), 'Portuguese', 'pt'),
(NEWID(), 'Punjabi', 'pa'),
(NEWID(), 'Quechua', 'qu'),
(NEWID(), 'Rhaeto-Romance', 'rm'),
(NEWID(), 'Romanian', 'ro'),
(NEWID(), 'Russian', 'ru'),
(NEWID(), 'Samoan', 'sm'),
(NEWID(), 'Sangro', 'sg'),
(NEWID(), 'Sanskrit', 'sa'),
(NEWID(), 'Scots Gaelic', 'gd'),
(NEWID(), 'Serbian', 'sr'),
(NEWID(), 'Serbo-Croatian', 'sh'),
(NEWID(), 'Sesotho', 'st'),
(NEWID(), 'Setswana', 'tn'),
(NEWID(), 'Shona', 'sn'),
(NEWID(), 'Sindhi', 'sd'),
(NEWID(), 'Singhalese', 'si'),
(NEWID(), 'Siswati', 'ss'),
(NEWID(), 'Slovak', 'sk'),
(NEWID(), 'Slovenian', 'sl'),
(NEWID(), 'Somali', 'so'),
(NEWID(), 'Spanish', 'es'),
(NEWID(), 'Sudanese', 'su'),
(NEWID(), 'Swahili', 'sw'),
(NEWID(), 'Swedish', 'sv'),
(NEWID(), 'Tagalog', 'tl'),
(NEWID(), 'Tajik', 'tg'),
(NEWID(), 'Tamil', 'ta'),
(NEWID(), 'Tatar', 'tt'),
(NEWID(), 'Tegulu', 'te'),
(NEWID(), 'Thai', 'th'),
(NEWID(), 'Tibetan', 'bo'),
(NEWID(), 'Tigrinya', 'ti'),
(NEWID(), 'Tonga', 'to'),
(NEWID(), 'Tsonga', 'ts'),
(NEWID(), 'Turkish', 'tr'),
(NEWID(), 'Turkmen', 'tk'),
(NEWID(), 'Twi', 'tw'),
(NEWID(), 'Uigur', 'ug'),
(NEWID(), 'Ukrainian', 'uk'),
(NEWID(), 'Urdu', 'ur'),
(NEWID(), 'Uzbek', 'uz'),
(NEWID(), 'Vietnamese', 'vi'),
(NEWID(), 'Volapuk', 'vo'),
(NEWID(), 'Welch', 'cy'),
(NEWID(), 'Wolof', 'wo'),
(NEWID(), 'Xhosa', 'xh'),
(NEWID(), 'Yiddish (former ji)', 'yi'),
(NEWID(), 'Yoruba', 'yo'),
(NEWID(), 'Zhuang', 'za'),
(NEWID(), 'Zulu', 'zu')

DECLARE @LangEnglish uniqueidentifier;
DECLARE @LangJapanese uniqueidentifier;
DECLARE @LangSpanish uniqueidentifier;
DECLARE @LangKorean uniqueidentifier;
DECLARE @LangItalian uniqueidentifier;
DECLARE @LangCzech uniqueidentifier;
DECLARE @LangUkrainian uniqueidentifier;
DECLARE @LangGerman uniqueidentifier;
DECLARE @LangFrench uniqueidentifier;
SET @LangEnglish = (SELECT l.ID FROM Languages l WHERE l.Name = 'English');
SET @LangJapanese = (SELECT l.ID FROM Languages l WHERE l.Name = 'Japanese');
SET @LangSpanish = (SELECT l.ID FROM Languages l WHERE l.Name = 'Spanish');
SET @LangKorean = (SELECT l.ID FROM Languages l WHERE l.Name = 'Korean');
SET @LangItalian = (SELECT l.ID FROM Languages l WHERE l.Name = 'Italian');
SET @LangCzech = (SELECT l.ID FROM Languages l WHERE l.Name = 'Czech');
SET @LangUkrainian = (SELECT l.ID FROM Languages l WHERE l.Name = 'Ukrainian');
SET @LangGerman = (SELECT l.ID FROM Languages l WHERE l.Name = 'German');
SET @LangFrench = (SELECT l.ID FROM Languages l WHERE l.Name = 'French');


-- Insert into Users
INSERT INTO [dbo].[Users] ([ID], [Username], [PasswordHash], [FirstName], [LastName], [Email])
VALUES
(NEWID(), 'NeelPeters', '9e6ee03a2266b56d7bf217e9a82baa15', 'Neel', 'Peters', 'NeelPeters@test.com'),
(NEWID(), 'EmberMcdaniel', 'f2841970116e2f4ee618df54613f05eb', 'Ember', 'Mcdaniel', 'EmberMcdaniel@test.com'),
(NEWID(), 'TakumiSuzuki', 'a3e334f4bb7a18104f0eb30729a0262a', 'Takumi', 'Suzuki', 'TakumiSuzuki@test.com'),
(NEWID(), 'LilianMcgregor', 'edb6352c49431cb6efdd93b2574239cf', 'Lilian', 'Mcgregor', 'LilianMcgregor@test.com'),
(NEWID(), 'NeveForrest', 'cfb&5ZJX7@Vz^W=^', 'Neve', 'Forrest', 'NeveForrest@test.com'),
(NEWID(), 'LindsayPratt', '1fcc3c26b5910ec40f252cfb9833cc60', 'Lindsay', 'Pratt', 'LindsayPratt@test.com'),
(NEWID(), 'LaylaRutledge', 'dfc1cbacf28ffbb95717dfdf38b07f43', 'Layla', 'Rutledge', 'LaylaRutledge@test.com'),
(NEWID(), 'JordanGray', '52ce824e8483d907fc6a2f4abe8a2ee0', 'Jordan', 'Gray', 'JordanGray@test.com'),
(NEWID(), 'KennedyAndrews', 'e96739ed05d8931bebbeeeb091c2f5cf', 'Kennedy', 'Andrews', 'KennedyAndrews@test.com'),
(NEWID(), 'AnnikaRice', '8ee2027983915ec78acc45027d874316', 'Annika', 'Rice', 'AnnikaRice@test.com')

DECLARE @User1 uniqueidentifier;
DECLARE @User2 uniqueidentifier;
DECLARE @User3 uniqueidentifier;
DECLARE @User4 uniqueidentifier;
DECLARE @User5 uniqueidentifier;
DECLARE @User6 uniqueidentifier;
DECLARE @User7 uniqueidentifier;
DECLARE @User8 uniqueidentifier;
DECLARE @User9 uniqueidentifier;
DECLARE @User10 uniqueidentifier;
SET @User1 = (SELECT u.ID FROM Users u WHERE u.Username = 'NeelPeters');
SET @User2 = (SELECT u.ID FROM Users u WHERE u.Username = 'EmberMcdaniel');
SET @User3 = (SELECT u.ID FROM Users u WHERE u.Username = 'TakumiSuzuki');
SET @User4  = (SELECT u.ID FROM Users u WHERE u.Username = 'LilianMcgregor');
SET @User5  = (SELECT u.ID FROM Users u WHERE u.Username = 'NeveForrest');
SET @User6  = (SELECT u.ID FROM Users u WHERE u.Username = 'LindsayPratt');
SET @User7  = (SELECT u.ID FROM Users u WHERE u.Username = 'LaylaRutledge');
SET @User8  = (SELECT u.ID FROM Users u WHERE u.Username = 'JordanGray');
SET @User9  = (SELECT u.ID FROM Users u WHERE u.Username = 'KennedyAndrews');
SET @User10 = (SELECT u.ID FROM Users u WHERE u.Username = 'AnnikaRice');


-- Insert into Projects
INSERT INTO [Projects] ([ID], [Name], [Description], [UserID], [SourceLanguageID])
VALUES
(NEWID(), 'Mastersky Game', 'This is a story-rich fantasy adventure mobile game. The plot describes how the nonchalant life of a woman might be changing forever as a stranger enters her life. The stranger claims the woman is in possession of a powerful artifact, an artifact which looks like any ordinary object, but an artifact which is of the utmost importance to this person, who will offer a reward for it. Believing both the situation and this stranger, the woman hesitantly agrees to the proposal, but there''s no time to waste, a decision had to be made quickly. But what if this stranger is trying to manipulate the situation. Or what if the complete opposite is true. How could an ordinary woman play a part in all this. Time will tell.', @User1, @LangEnglish),
(NEWID(), 'Emergency Road Game', 'A racing game. Please help me translate it!', @User2, @LangEnglish),
(NEWID(), 'MirrorOS', 'Hello! I am developing an operating system and I need help with translations.', @User4, @LangEnglish),
(NEWID(), 'My best friend is my future self and my cat is a robot!?', 'Herro! i am writing an engaging right noveru and i need tū turransrate it tū engrish. Itsu about a haigh schooru stsudent who is persuaded by promises of fame and fortsune tū unnuraveru the mystery of the strange changes taking prace in his hometown. He mast confront a virrain who was once a friend. His onry arry is his fruffy cat.', @User3, @LangJapanese)

DECLARE @Project1 uniqueidentifier;
DECLARE @Project2 uniqueidentifier;
DECLARE @Project3 uniqueidentifier;
DECLARE @Project4 uniqueidentifier;
SET @Project1 = (SELECT p.ID FROM Projects p WHERE p.Name = 'Mastersky Game');
SET @Project2 = (SELECT p.ID FROM Projects p WHERE p.Name = 'Emergency Road Game');
SET @Project3 = (SELECT p.ID FROM Projects p WHERE p.Name = 'MirrorOS');
SET @Project4 = (SELECT p.ID FROM Projects p WHERE p.Name = 'My best friend is my future self and my cat is a robot!?');


-- Insert into TargetLanguages
INSERT INTO [TargetLanguages] ([ProjectID], [LanguageID])
VALUES
(@Project1, @LangFrench),
(@Project1, @LangGerman),
(@Project1, @LangJapanese),
(@Project2, @LangItalian),
(@Project2, @LangCzech),
(@Project2, @LangKorean),
(@Project3, @LangGerman),
(@Project3, @LangUkrainian),
(@Project3, @LangItalian),
(@Project4, @LangEnglish)


-- Insert into Phrases
INSERT INTO [dbo].[Phrases] ([ID], [Text], [ProjectID])
VALUES

(NEWID(), 'A rumble in the skies and an aurora-like spectacle mark the coming of an angel', @Project1),
(NEWID(), 'a hulking being with clear, white eyes', @Project1),
(NEWID(), 'a pained expression', @Project1),
(NEWID(), 'its canopy was dominated by cottonwood, juniper, and walnut, and the occasional beam of light', @Project1),
(NEWID(), 'Curving branches embraced many trees, and an array of flowers, which blossomed brightly.', @Project1),
(NEWID(), 'Its massive tail ends in a sharp, arrowhead shaped tip and is covered in the same narrow scales as its body.', @Project1),

(NEWID(), 'a technological metropolis', @Project2),
(NEWID(), 'coffeehouses, take-outs and clubs', @Project2),
(NEWID(), 'about to need a new transmission', @Project2),
(NEWID(), 'rattling sound', @Project2),
(NEWID(), 'tinted windows', @Project2),

(NEWID(), 'function call', @Project3),
(NEWID(), 'The debugger comes with three profilers for your processor, network operations, and video memory.', @Project3),
(NEWID(), 'virtual callbacks', @Project3),
(NEWID(), 'managing shared functionality or data', @Project3),
(NEWID(), 'debugging', @Project3),

(NEWID(), 'kakatte koi yo!', @Project4),
(NEWID(), 'jibun de kimeru na!', @Project4),
(NEWID(), 'baka na koto o iu na!', @Project4),
(NEWID(), 'sou itte mo', @Project4),
(NEWID(), 'taigi no tameni', @Project4),
(NEWID(), 'omae no aite wa ore da', @Project4),
(NEWID(), 'Kore wa genjitsu da!', @Project4),
(NEWID(), 'nani yatte n da yo?', @Project4)

DECLARE @Phr1 uniqueidentifier;
DECLARE @Phr2 uniqueidentifier;
DECLARE @Phr3 uniqueidentifier;
DECLARE @Phr4 uniqueidentifier;
DECLARE @Phr5 uniqueidentifier;
DECLARE @Phr6 uniqueidentifier;
DECLARE @Phr7 uniqueidentifier;
DECLARE @Phr8 uniqueidentifier;
DECLARE @Phr9 uniqueidentifier;
DECLARE @Phr10 uniqueidentifier;
SET @Phr1  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'a hulking being with clear, white eyes');
SET @Phr2  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'a pained expression');
SET @Phr3  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'a technological metropolis');
SET @Phr4  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'rattling sound');
SET @Phr5  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'tinted windows');
SET @Phr6  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'function call');
SET @Phr7  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'virtual callbacks');
SET @Phr8  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'kakatte koi yo!');
SET @Phr9  = (SELECT p.ID FROM Phrases p WHERE p.Text = 'taigi no tameni');
SET	@Phr10 = (SELECT p.ID FROM Phrases p WHERE p.Text = 'nani yatte n da yo?');

-- Insert into Translations
INSERT INTO [dbo].[Translations] ([ID], [Text], [PhraseID], [LanguageID], [UserID])
VALUES
(NEWID(), 'un être énorme avec des yeux clairs et blancs', @Phr1, @LangFrench, @User7),
(NEWID(), 'ein riesiges Wesen mit klaren, weißen Augen', @Phr1, @LangGerman, @User5),
(NEWID(), 'Hakkiri to shita shiroi me o shite iru karada no ōki-sa', @Phr1, @LangJapanese, @User8),
(NEWID(), 'une expression douloureuse', @Phr2, @LangFrench, @User7),
(NEWID(), 'technologická metropole', @Phr3, @LangCzech, @User1),
(NEWID(), 'una metropoli tecnologica', @Phr3, @LangItalian, @User10),
(NEWID(), 'suono tintinnante', @Phr4, @LangItalian, @User9),
(NEWID(), 'crepitio tintinnante', @Phr4, @LangItalian, @User8),
(NEWID(), 'chraplavý zvuk', @Phr4, @LangCzech, @User7),
(NEWID(), 'tónovaná okna', @Phr5, @LangCzech, @User7),
(NEWID(), 'chagsaeg chang', @Phr5, @LangKorean, @User3),
(NEWID(), 'Funktionsaufruf', @Phr6, @LangGerman, @User5),
(NEWID(), 'vyklyk funktsiyi', @Phr6, @LangUkrainian, @User5),
(NEWID(), 'virtuelle Rückrufe', @Phr7, @LangGerman, @User5),
(NEWID(), 'richiamate virtuali', @Phr7, @LangItalian, @User10),
(NEWID(), 'Bring it on!', @Phr8, @LangEnglish, @User1),
(NEWID(), 'Come on!', @Phr8, @LangEnglish, @User2),
(NEWID(), 'For the greater good', @Phr9, @LangEnglish, @User9),
(NEWID(), 'For great justice', @Phr9, @LangEnglish, @User7),
(NEWID(), 'What are you doing?', @Phr10, @LangEnglish, @User5),
(NEWID(), 'What do you do?', @Phr10, @LangEnglish, @User6)

DECLARE @Trad1 uniqueidentifier;
DECLARE @Trad2 uniqueidentifier;
DECLARE @Trad3 uniqueidentifier;
DECLARE @Trad4 uniqueidentifier;
DECLARE @Trad5 uniqueidentifier;
DECLARE @Trad6 uniqueidentifier;
DECLARE @Trad7 uniqueidentifier;
DECLARE @Trad8 uniqueidentifier;
DECLARE @Trad9 uniqueidentifier;
DECLARE @Trad10 uniqueidentifier;
SET @Trad1   = (SELECT t.ID FROM Translations t WHERE t.Text = 'un être énorme avec des yeux clairs et blancs');
SET @Trad2   = (SELECT t.ID FROM Translations t WHERE t.Text = 'ein riesiges Wesen mit klaren, weißen Augen');
SET @Trad3   = (SELECT t.ID FROM Translations t WHERE t.Text = 'une expression douloureuse');
SET @Trad4   = (SELECT t.ID FROM Translations t WHERE t.Text = 'una metropoli tecnologica');
SET @Trad5   = (SELECT t.ID FROM Translations t WHERE t.Text = 'suono tintinnante');
SET @Trad6   = (SELECT t.ID FROM Translations t WHERE t.Text = 'Bring it on!');
SET @Trad7   = (SELECT t.ID FROM Translations t WHERE t.Text = 'Come on!');
SET @Trad8   = (SELECT t.ID FROM Translations t WHERE t.Text = 'For the greater good');
SET @Trad9   = (SELECT t.ID FROM Translations t WHERE t.Text = 'What are you doing?');
SET @Trad10  = (SELECT t.ID FROM Translations t WHERE t.Text = 'crepitio tintinnante');


-- Insert into Votes
INSERT INTO [dbo].[Votes] ([UserID], [TranslationID], [IsUpvote])
VALUES
(@User1, @Trad1, 1),
(@User2, @Trad1, 1),
(@User6, @Trad1, 1),

(@User1, @Trad2, 1),

(@User1, @Trad3, 1),

(@User5, @Trad4, 1),
(@User7, @Trad4, 0),
(@User9, @Trad4, 1),

(@User1, @Trad5, 1),
(@User2, @Trad5, 1),
(@User3, @Trad5, 1),
(@User8, @Trad5, 1),
(@User10, @Trad5, 1),

(@User1, @Trad6, 1),
(@User3, @Trad6, 1),
(@User5, @Trad6, 1),

(@User6, @Trad7, 1),
(@User9, @Trad7, 1),
(@User4, @Trad7, 0),

(@User1, @Trad8, 1),
(@User3, @Trad8, 1),
(@User2, @Trad8, 1),

(@User7, @Trad9, 1),

(@User1, @Trad10, 0)

