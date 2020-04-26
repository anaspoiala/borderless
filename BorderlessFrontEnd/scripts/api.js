const api = (() => {
	const languages = [
		{
			ID: "ffc49d33-d1f8-4781-b232-0271fc10d829",
			Name: "Tatar",
			Abbreviation: "tt",
		},
		{
			ID: "1fd8baac-0dd7-4b0a-955a-05af183fa1dc",
			Name: "Arabic",
			Abbreviation: "ar",
		},
		{
			ID: "dd57d682-ea2e-489a-9e0d-070069782194",
			Name: "Zulu",
			Abbreviation: "zu",
		},
		{
			ID: "1abc27c7-2358-4354-bcb3-08b8d8923e55",
			Name: "Dutch",
			Abbreviation: "nl",
		},
		{
			ID: "3ef2e65d-d20b-479f-ad65-097e22e8419b",
			Name: "Bashkir",
			Abbreviation: "ba",
		},
		{
			ID: "1dea9fab-ecd9-4369-8a4c-137d80074919",
			Name: "Gujarati",
			Abbreviation: "gu",
		},
		{
			ID: "de1a878d-d90c-4269-a103-144464dce73f",
			Name: "Kirghiz",
			Abbreviation: "ky",
		},
		{
			ID: "e5150d5c-eb39-4f3d-a01a-15a872c2ccae",
			Name: "Scots Gaelic",
			Abbreviation: "gd",
		},
		{
			ID: "14e779d1-4759-4c16-b92b-165b17ee5a81",
			Name: "Bhutani",
			Abbreviation: "dz",
		},
		{
			ID: "878a80d1-7582-4f80-ae97-1756ed0841ba",
			Name: "Fiji",
			Abbreviation: "fj",
		},
		{
			ID: "28b14fbc-146e-4e82-be1b-1777e871bf95",
			Name: "Lithuanian",
			Abbreviation: "lt",
		},
		{
			ID: "b83754f4-a54d-4ae0-9cf6-185a962274aa",
			Name: "Hindi",
			Abbreviation: "hi",
		},
		{
			ID: "863bff4e-4524-4912-af99-18dbe7b6cfca",
			Name: "Greek",
			Abbreviation: "el",
		},
		{
			ID: "38fb7063-6720-430c-aa30-1ec3fbea722d",
			Name: "Somali",
			Abbreviation: "so",
		},
		{
			ID: "877e1797-44dd-4e62-b5fe-1fa35fffb46a",
			Name: "Icelandic",
			Abbreviation: "is",
		},
		{
			ID: "99c755bf-dbe1-4659-be10-21aaa56b934f",
			Name: "Guarani",
			Abbreviation: "gn",
		},
		{
			ID: "6e513542-3576-4c8f-b11b-21ffe9ac0674",
			Name: "Galician",
			Abbreviation: "gl",
		},
		{
			ID: "69227ba8-f0fb-4fbe-880f-23cc51e27232",
			Name: "Twi",
			Abbreviation: "tw",
		},
		{
			ID: "7d442681-3b9a-422c-8964-24f66290d51c",
			Name: "Yiddish (former ji)",
			Abbreviation: "yi",
		},
		{
			ID: "6e2d7001-8936-4930-bfb3-27c105f01dfb",
			Name: "Javanese",
			Abbreviation: "jw",
		},
		{
			ID: "3874b656-4108-44db-81ea-2b22f8c2e79b",
			Name: "Corsican",
			Abbreviation: "co",
		},
		{
			ID: "d5a0472f-553d-4130-bd19-2b4a7b04f752",
			Name: "Russian",
			Abbreviation: "ru",
		},
		{
			ID: "a150d738-f4d2-47f7-8d2c-31f385eaa008",
			Name: "Nauru",
			Abbreviation: "na",
		},
		{
			ID: "34677241-d2d7-4e74-8c4e-32d49459ff38",
			Name: "Spanish",
			Abbreviation: "es",
		},
		{
			ID: "2d8f4bac-092e-4acd-9a7e-3326b2417b3f",
			Name: "Mongolian",
			Abbreviation: "mn",
		},
		{
			ID: "00cc6eab-ba01-4238-86f6-355ea589dd7a",
			Name: "Quechua",
			Abbreviation: "qu",
		},
		{
			ID: "b3ba9372-bbad-43ee-b924-38b3c5f3cb5e",
			Name: "Serbo-Croatian",
			Abbreviation: "sh",
		},
		{
			ID: "919f6479-d12a-4611-920c-394bce052a4e",
			Name: "Estonian",
			Abbreviation: "et",
		},
		{
			ID: "a8154896-d853-43a0-bfeb-39ef2cf17f8d",
			Name: "Thai",
			Abbreviation: "th",
		},
		{
			ID: "4ceba2d6-4d4b-429d-a3fa-3bff15b408a5",
			Name: "Sangro",
			Abbreviation: "sg",
		},
		{
			ID: "6f46f506-920b-486c-bef0-3de83503763b",
			Name: "Hungarian",
			Abbreviation: "hu",
		},
		{
			ID: "c83515c1-9d34-40cb-b1f7-3e9f137d5bd3",
			Name: "Swahili",
			Abbreviation: "sw",
		},
		{
			ID: "ec26ce22-9374-4c83-a771-3ed0a3eb6b1b",
			Name: "Azerbaijani",
			Abbreviation: "az",
		},
		{
			ID: "ae6cf340-1a14-4dba-925f-3fe8e646bcd8",
			Name: "Setswana",
			Abbreviation: "tn",
		},
		{
			ID: "f21c7543-7af0-4897-8152-40505a4514ac",
			Name: "Kashmiri",
			Abbreviation: "ks",
		},
		{
			ID: "4315ba34-9b78-4169-997b-40c15c6f09ad",
			Name: "Marathi",
			Abbreviation: "mr",
		},
		{
			ID: "e3155d1d-20b5-4896-b4a3-41110ec8c570",
			Name: "Faeroese",
			Abbreviation: "fo",
		},
		{
			ID: "9f82785e-7143-45a8-9535-44cb768e06a0",
			Name: "Persian",
			Abbreviation: "fa",
		},
		{
			ID: "e5b912b6-0926-4f59-be21-455a0a389a16",
			Name: "Pashto, Pushto",
			Abbreviation: "ps",
		},
		{
			ID: "336081e8-3731-4e7a-816e-461a4331bd79",
			Name: "Sudanese",
			Abbreviation: "su",
		},
		{
			ID: "6fe618b7-fe46-4f9a-be0b-46766da0bf78",
			Name: "Abkhazian",
			Abbreviation: "ab",
		},
		{
			ID: "e3fe64ed-e336-4d5c-b21c-47cad3ddabca",
			Name: "Korean",
			Abbreviation: "ko",
		},
		{
			ID: "7da2ed4a-806f-4ca9-bf9f-49942a8cc57b",
			Name: "Hausa",
			Abbreviation: "ha",
		},
		{
			ID: "94b2bf6a-477e-40bc-a588-49e90e1c2b7f",
			Name: "Bihari",
			Abbreviation: "bh",
		},
		{
			ID: "04d6a7ba-65e6-4af9-a05c-4a005ff86a77",
			Name: "Oriya",
			Abbreviation: "or",
		},
		{
			ID: "288c7773-93a3-4fbf-8632-4a14b97ae722",
			Name: "Lingala",
			Abbreviation: "ln",
		},
		{
			ID: "4bb68aa4-cb44-4979-a727-4a29e09d0335",
			Name: "Xhosa",
			Abbreviation: "xh",
		},
		{
			ID: "750ec67c-9a54-4fc8-9ead-4a8fca8512d7",
			Name: "Greenlandic",
			Abbreviation: "kl",
		},
		{
			ID: "826be614-6369-4cab-91c2-4a9645ffb1f0",
			Name: "Kannada",
			Abbreviation: "kn",
		},
		{
			ID: "5d918ada-f5f4-45b7-bbf9-4ada4abac30f",
			Name: "Wolof",
			Abbreviation: "wo",
		},
		{
			ID: "febad891-eec4-4527-8c05-4d1362d7d358",
			Name: "(Afan) Oromo",
			Abbreviation: "om",
		},
		{
			ID: "56f00e50-72a0-4e84-a945-4e25304fc4ca",
			Name: "Czech",
			Abbreviation: "cs",
		},
		{
			ID: "1e737e98-0ead-4e27-af8f-51dcc6db400e",
			Name: "Nepali",
			Abbreviation: "ne",
		},
		{
			ID: "02114c55-6c82-41e6-8d4e-535f5cb78540",
			Name: "Sanskrit",
			Abbreviation: "sa",
		},
		{
			ID: "9a16c434-8ba0-49ec-ba94-5601b61a6529",
			Name: "Polish",
			Abbreviation: "pl",
		},
		{
			ID: "5309384b-d538-4766-9f82-566fe4546d32",
			Name: "Malay",
			Abbreviation: "ms",
		},
		{
			ID: "2d3edb42-1cc3-4060-ba7f-576eb8005274",
			Name: "Assamese",
			Abbreviation: "as",
		},
		{
			ID: "b8b7309c-e18a-426a-a5bd-577d23bdafd1",
			Name: "Tamil",
			Abbreviation: "ta",
		},
		{
			ID: "3cff8fab-5244-4b8a-8281-5941724c2e3f",
			Name: "Finnish",
			Abbreviation: "fi",
		},
		{
			ID: "2f00574e-3fbc-4f0c-9935-67038b609541",
			Name: "Danish",
			Abbreviation: "da",
		},
		{
			ID: "9604b5d4-0742-4d3c-8a8f-67161fe5724b",
			Name: "Tibetan",
			Abbreviation: "bo",
		},
		{
			ID: "559950bf-ba56-4588-afae-689c8d419b4e",
			Name: "Interlingua",
			Abbreviation: "ia",
		},
		{
			ID: "ace68c70-a480-43f3-86e4-6995c23d75ca",
			Name: "Moldavian",
			Abbreviation: "mo",
		},
		{
			ID: "12a9bee6-d69a-4942-8e88-6ba027bc19f2",
			Name: "Portuguese",
			Abbreviation: "pt",
		},
		{
			ID: "0ba57ea3-746b-42c3-abb2-6ee0728d31f0",
			Name: "Bengali",
			Abbreviation: "bn",
		},
		{
			ID: "3133d895-7b00-49d7-936e-7261f3a15f61",
			Name: "Punjabi",
			Abbreviation: "pa",
		},
		{
			ID: "ccfd18b3-2bf8-47a6-920c-75c2247bd627",
			Name: "Singhalese",
			Abbreviation: "si",
		},
		{
			ID: "4a109bf3-aaca-40d3-9e99-75cf0b260f27",
			Name: "Hebrew (former iw)",
			Abbreviation: "he",
		},
		{
			ID: "59ba3c4b-30ee-4721-beee-75d282bcdbe6",
			Name: "Sindhi",
			Abbreviation: "sd",
		},
		{
			ID: "dce7b715-c1e1-4bb9-8874-7611580f8f01",
			Name: "Malayalam",
			Abbreviation: "ml",
		},
		{
			ID: "668130dc-f4f8-450c-9879-7664f3293142",
			Name: "Chinese",
			Abbreviation: "zh",
		},
		{
			ID: "0141d09c-4bad-4328-9c59-7a0b24ab0c4d",
			Name: "Afar",
			Abbreviation: "aa",
		},
		{
			ID: "77cd6ee5-d673-491e-a576-7b16e5703735",
			Name: "Zhuang",
			Abbreviation: "za",
		},
		{
			ID: "d2940d6f-3cc5-424a-bae2-8030975a1296",
			Name: "Sesotho",
			Abbreviation: "st",
		},
		{
			ID: "723249ce-65e7-4957-920d-87faa5d7f74c",
			Name: "Laothian",
			Abbreviation: "lo",
		},
		{
			ID: "594bc327-6c26-4c6e-96d2-88c114d786e3",
			Name: "Breton",
			Abbreviation: "br",
		},
		{
			ID: "b5a9320d-f0a1-495a-9a90-8a741cbb95ab",
			Name: "Samoan",
			Abbreviation: "sm",
		},
		{
			ID: "4fc3248a-4dff-42c0-9aef-8b989cd385c7",
			Name: "German",
			Abbreviation: "de",
		},
		{
			ID: "fe70d42b-8289-443c-a022-8c405865fa83",
			Name: "Italian",
			Abbreviation: "it",
		},
		{
			ID: "89e662f3-6239-4f0f-b994-8d44d2184fd4",
			Name: "Welch",
			Abbreviation: "cy",
		},
		{
			ID: "dea0108e-8204-41e8-ab43-8f4d0edab1d0",
			Name: "Irish",
			Abbreviation: "ga",
		},
		{
			ID: "8428e01b-e36c-4cfe-a741-8ff776439178",
			Name: "Kazakh",
			Abbreviation: "kk",
		},
		{
			ID: "b633eed4-8a4f-417a-8763-92a55c9866c2",
			Name: "Indonesian (former in)",
			Abbreviation: "id",
		},
		{
			ID: "4adbfb93-7885-449a-96d3-9448794a382b",
			Name: "Shona",
			Abbreviation: "sn",
		},
		{
			ID: "d3a51782-2908-4e55-a124-95fc96d61507",
			Name: "Occitan",
			Abbreviation: "oc",
		},
		{
			ID: "7ef67371-f6ef-452e-8030-9db16d3c2cc9",
			Name: "Frisian",
			Abbreviation: "fy",
		},
		{
			ID: "62149324-a2e7-4825-9001-a4b0e5c66127",
			Name: "Armenian",
			Abbreviation: "hy",
		},
		{
			ID: "708c827c-2c7e-4e52-8637-a4d112ff9057",
			Name: "Afrikaans",
			Abbreviation: "af",
		},
		{
			ID: "8268bbdf-ea22-4da2-81bb-a618ca8050be",
			Name: "Maori",
			Abbreviation: "mi",
		},
		{
			ID: "5a0853bd-d1b9-494e-b49b-a6a39fc5e4fa",
			Name: "Swedish",
			Abbreviation: "sv",
		},
		{
			ID: "40a538e6-92be-45e1-bb05-a85335ae64ed",
			Name: "Macedonian",
			Abbreviation: "mk",
		},
		{
			ID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
			Name: "English",
			Abbreviation: "en",
		},
		{
			ID: "f0420b15-b673-4aee-ae27-aa9261b4b42c",
			Name: "Turkmen",
			Abbreviation: "tk",
		},
		{
			ID: "17384beb-a183-4b7f-aa4f-abede1c5cd4b",
			Name: "Slovenian",
			Abbreviation: "sl",
		},
		{
			ID: "bb526e85-a278-4d97-8c01-ac8a823a0fb6",
			Name: "French",
			Abbreviation: "fr",
		},
		{
			ID: "8cc3619f-697a-4d9a-859c-afd161af6822",
			Name: "Tsonga",
			Abbreviation: "ts",
		},
		{
			ID: "e8b68211-9718-436a-91f7-b056640e2e07",
			Name: "Romanian",
			Abbreviation: "ro",
		},
		{
			ID: "740c0989-b038-4ba3-b8c8-b1d99c879445",
			Name: "Slovak",
			Abbreviation: "sk",
		},
		{
			ID: "a6864578-6f90-4abd-8c75-b32956c0d00b",
			Name: "Siswati",
			Abbreviation: "ss",
		},
		{
			ID: "bf825b40-1549-4a0a-9e3c-b48eb0603fed",
			Name: "Tegulu",
			Abbreviation: "te",
		},
		{
			ID: "dc53c04d-420c-4c71-af43-b51401b8e3c8",
			Name: "Inupiak",
			Abbreviation: "ik",
		},
		{
			ID: "7d1c7e62-063e-4511-b067-b6614f589eab",
			Name: "Kinyarwanda",
			Abbreviation: "rw",
		},
		{
			ID: "0bbf03a7-b9f0-4629-b553-b8116e698b5c",
			Name: "Kurdish",
			Abbreviation: "ku",
		},
		{
			ID: "6152f5c7-9024-45e0-aba0-b983a25943d3",
			Name: "Bulgarian",
			Abbreviation: "bg",
		},
		{
			ID: "64ef11c1-4bbf-4352-9e09-bb2e07c748fd",
			Name: "Serbian",
			Abbreviation: "sr",
		},
		{
			ID: "9baa52f4-a659-4796-955d-bbb79aeeeb9b",
			Name: "Norwegian",
			Abbreviation: "no",
		},
		{
			ID: "d145aabe-87df-49d6-a532-bbbb2e45b7e4",
			Name: "Volapuk",
			Abbreviation: "vo",
		},
		{
			ID: "cb68c0c6-dae9-47e6-8217-bd392d5b94ce",
			Name: "Tagalog",
			Abbreviation: "tl",
		},
		{
			ID: "e557df82-73ae-4b57-84ab-c0483f7221dd",
			Name: "Georgian",
			Abbreviation: "ka",
		},
		{
			ID: "a1a1c661-4e7f-4e5b-b553-c251858c6799",
			Name: "Cambodian",
			Abbreviation: "km",
		},
		{
			ID: "0e0dcc4a-e745-4f9d-ba7e-c3ce51da18c0",
			Name: "Malagasy",
			Abbreviation: "mg",
		},
		{
			ID: "3b7ae62d-0055-4928-8888-c420ea3265b0",
			Name: "Uigur",
			Abbreviation: "ug",
		},
		{
			ID: "79ac9f2f-a26d-4d7a-98e7-c42a91ebd361",
			Name: "Japanese",
			Abbreviation: "ja",
		},
		{
			ID: "494b32ce-25d3-4b8e-930b-c6a9f2a3760c",
			Name: "Albanian",
			Abbreviation: "sq",
		},
		{
			ID: "2d4777f9-e718-4e24-9583-ccf923f18968",
			Name: "Burmese",
			Abbreviation: "my",
		},
		{
			ID: "eb1dc776-6a1e-47e8-af75-cdbda3122cf8",
			Name: "Uzbek",
			Abbreviation: "uz",
		},
		{
			ID: "7e94052d-601e-4f4e-9050-ce70cc768b88",
			Name: "Inuktitut (Eskimo)",
			Abbreviation: "iu",
		},
		{
			ID: "f5d5a402-028e-47be-99e6-cf7c05e23ac3",
			Name: "Yoruba",
			Abbreviation: "yo",
		},
		{
			ID: "d80f25b7-56a9-4b62-b8c4-d2d27397b014",
			Name: "Maltese",
			Abbreviation: "mt",
		},
		{
			ID: "b186f0bf-5063-45c2-979b-d306be4e9987",
			Name: "Bislama",
			Abbreviation: "bi",
		},
		{
			ID: "ead1feca-3c58-4e3a-9646-d36cfbf87c6f",
			Name: "Rhaeto-Romance",
			Abbreviation: "rm",
		},
		{
			ID: "0dc3dbdb-b53f-4870-b56d-d4964f02788c",
			Name: "Interlingue",
			Abbreviation: "ie",
		},
		{
			ID: "59b83373-3947-434d-b6a2-d6c4e9489673",
			Name: "Basque",
			Abbreviation: "eu",
		},
		{
			ID: "25bfd27f-0607-4989-b39a-d6e3ec555034",
			Name: "Latin",
			Abbreviation: "la",
		},
		{
			ID: "51dda546-54b0-4f1b-9368-d7b295f865ac",
			Name: "Amharic",
			Abbreviation: "am",
		},
		{
			ID: "1d14ab81-ab66-4d82-ad42-df613a4f4470",
			Name: "Aymara",
			Abbreviation: "ay",
		},
		{
			ID: "af63c5cf-f758-4b2e-a198-e0a124ca5026",
			Name: "Byelorussian",
			Abbreviation: "be",
		},
		{
			ID: "f3af2503-06a1-4951-8126-e684d06b3469",
			Name: "Tigrinya",
			Abbreviation: "ti",
		},
		{
			ID: "19fd0cb0-8379-4aca-be54-e817b6fbb94a",
			Name: "Latvian, Lettish",
			Abbreviation: "lv",
		},
		{
			ID: "bd89ca6a-a2d5-44cd-b6f5-e9f92f351cca",
			Name: "Turkish",
			Abbreviation: "tr",
		},
		{
			ID: "9b5c51b6-8504-4e86-a323-ecc7536c7582",
			Name: "Urdu",
			Abbreviation: "ur",
		},
		{
			ID: "ff78b180-f371-4f04-b39a-edbf7e89bb2b",
			Name: "Kirundi",
			Abbreviation: "rn",
		},
		{
			ID: "58286791-4535-40e3-9c7b-f07aaef0e723",
			Name: "Esperanto",
			Abbreviation: "eo",
		},
		{
			ID: "e0493aff-90af-4072-ba29-f13811cb5e2b",
			Name: "Ukrainian",
			Abbreviation: "uk",
		},
		{
			ID: "02e57e15-7b2c-44a0-ad89-f2eff3965419",
			Name: "Croatian",
			Abbreviation: "hr",
		},
		{
			ID: "325833f9-5656-480d-b42c-f4113fb41062",
			Name: "Tajik",
			Abbreviation: "tg",
		},
		{
			ID: "7eb1886d-df1a-4476-a29c-fb6487b7aa4e",
			Name: "Catalan",
			Abbreviation: "ca",
		},
		{
			ID: "1cf14d3d-6c83-4ab3-a828-fc231d59943e",
			Name: "Vietnamese",
			Abbreviation: "vi",
		},
		{
			ID: "34a841fb-226f-4195-b34b-fc6db7e8825a",
			Name: "Tonga",
			Abbreviation: "to",
		},
	];
	const users = [
		{
			ID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			Username: "NeelPeters",
			FirstName: "Neel",
			LastName: "Peters",
			Email: "NeelPeters@test.com",
		},
		{
			ID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
			Username: "NeveForrest",
			FirstName: "Neve",
			LastName: "Forrest",
			Email: "NeveForrest@test.com",
		},
		{
			ID: "e1e9d3aa-84f0-486e-b02c-5ac992597f90",
			Username: "EmberMcdaniel",
			FirstName: "Ember",
			LastName: "Mcdaniel",
			Email: "EmberMcdaniel@test.com",
		},
		{
			ID: "3f5687ac-efb6-4341-b0af-6c1b7bb03939",
			Username: "TakumiSuzuki",
			FirstName: "Takumi",
			LastName: "Suzuki",
			Email: "TakumiSuzuki@test.com",
		},
		{
			ID: "f49715a9-ab92-480d-a589-6f83f8bfb744",
			Username: "JordanGray",
			FirstName: "Jordan",
			LastName: "Gray",
			Email: "JordanGray@test.com",
		},
		{
			ID: "0eefeb55-589d-457c-888a-79e8487f3238",
			Username: "LindsayPratt",
			FirstName: "Lindsay",
			LastName: "Pratt",
			Email: "LindsayPratt@test.com",
		},
		{
			ID: "59ca9cd6-8a47-4d59-9650-7e3921605054",
			Username: "LilianMcgregor",
			FirstName: "Lilian",
			LastName: "Mcgregor",
			Email: "LilianMcgregor@test.com",
		},
		{
			ID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
			Username: "LaylaRutledge",
			FirstName: "Layla",
			LastName: "Rutledge",
			Email: "LaylaRutledge@test.com",
		},
		{
			ID: "9c683a7c-4037-457d-abdb-a76cd1b9d13e",
			Username: "KennedyAndrews",
			FirstName: "Kennedy",
			LastName: "Andrews",
			Email: "KennedyAndrews@test.com",
		},
		{
			ID: "d7471d38-d89e-45c6-91b6-ab1fe02ecc92",
			Username: "AnnikaRice",
			FirstName: "Annika",
			LastName: "Rice",
			Email: "AnnikaRice@test.com",
		},
	];
	const projects = [
		{
			ID: "865fac1c-f220-489c-a65d-380d0c7f770f",
			UserID: "e1e9d3aa-84f0-486e-b02c-5ac992597f90",
			Name: "Emergency Road Game",
			Description: "A racing game. Please help me translate it!",
			SourceLanguage: {
				ID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
				Name: "English",
				Abbreviation: "en",
			},
			TargetLanguages: [
				{
					ID: "e3fe64ed-e336-4d5c-b21c-47cad3ddabca",
					Name: "Korean",
					Abbreviation: "ko",
				},
				{
					ID: "56f00e50-72a0-4e84-a945-4e25304fc4ca",
					Name: "Czech",
					Abbreviation: "cs",
				},
				{
					ID: "fe70d42b-8289-443c-a022-8c405865fa83",
					Name: "Italian",
					Abbreviation: "it",
				},
			],
		},
		{
			ID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			UserID: "3f5687ac-efb6-4341-b0af-6c1b7bb03939",
			Name: "My best friend is my future self and my cat is a robot!?",
			Description:
				"Herro! i am writing an engaging right noveru and i need tu turransrate it tu engrish. Itsu about a haigh schooru stsudent who is persuaded by promises of fame and fortsune tu unnuraveru the mystery of the strange changes taking prace in his hometown. He mast confront a virrain who was once a friend. His onry arry is his fruffy cat.",
			SourceLanguage: {
				ID: "79ac9f2f-a26d-4d7a-98e7-c42a91ebd361",
				Name: "Japanese",
				Abbreviation: "ja",
			},
			TargetLanguages: [
				{
					ID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
					Name: "English",
					Abbreviation: "en",
				},
			],
		},
		{
			ID: "beaae35c-6a00-4406-a423-9dd9281c15ec",
			UserID: "59ca9cd6-8a47-4d59-9650-7e3921605054",
			Name: "MirrorOS",
			Description:
				"Hello! I am developing an operating system and I need help with translations.",
			SourceLanguage: {
				ID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
				Name: "English",
				Abbreviation: "en",
			},
			TargetLanguages: [
				{
					ID: "4fc3248a-4dff-42c0-9aef-8b989cd385c7",
					Name: "German",
					Abbreviation: "de",
				},
				{
					ID: "fe70d42b-8289-443c-a022-8c405865fa83",
					Name: "Italian",
					Abbreviation: "it",
				},
				{
					ID: "e0493aff-90af-4072-ba29-f13811cb5e2b",
					Name: "Ukrainian",
					Abbreviation: "uk",
				},
			],
		},
		{
			ID: "85e49d08-53d6-424f-8030-ba8078242913",
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			Name: "Mastersky Game",
			Description:
				"This is a story-rich fantasy adventure mobile game. The plot describes how the nonchalant life of a woman might be changing forever as a stranger enters her life. The stranger claims the woman is in possession of a powerful artifact, an artifact which looks like any ordinary object, but an artifact which is of the utmost importance to this person, who will offer a reward for it. Believing both the situation and this stranger, the woman hesitantly agrees to the proposal, but there's no time to waste, a decision had to be made quickly. But what if this stranger is trying to manipulate the situation. Or what if the complete opposite is true. How could an ordinary woman play a part in all this. Time will tell.",
			SourceLanguage: {
				ID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
				Name: "English",
				Abbreviation: "en",
			},
			TargetLanguages: [
				{
					ID: "4fc3248a-4dff-42c0-9aef-8b989cd385c7",
					Name: "German",
					Abbreviation: "de",
				},
				{
					ID: "bb526e85-a278-4d97-8c01-ac8a823a0fb6",
					Name: "French",
					Abbreviation: "fr",
				},
				{
					ID: "79ac9f2f-a26d-4d7a-98e7-c42a91ebd361",
					Name: "Japanese",
					Abbreviation: "ja",
				},
			],
		},
	];
	const phrases = [
		{
			ID: "e40ef2ea-9fb1-49ca-8c53-07d77afaf8c0",
			ProjectID: "865fac1c-f220-489c-a65d-380d0c7f770f",
			Text: "a technological metropolis",
		},
		{
			ID: "821288c9-df0d-4536-96f6-1172175502f2",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "taigi no tameni",
		},
		{
			ID: "8c1a6daa-0019-4b02-842f-1aa4dd9d452d",
			ProjectID: "85e49d08-53d6-424f-8030-ba8078242913",
			Text:
				"its canopy was dominated by cottonwood, juniper, and walnut, and the occasional beam of light",
		},
		{
			ID: "63c296cf-68dd-4f66-8c10-1f0ad77b4edd",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "nani yatte n da yo?",
		},
		{
			ID: "11133174-8671-4262-9296-32a002899ffa",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "kakatte koi yo!",
		},
		{
			ID: "aec09a32-1061-43dd-8375-3459f51067bc",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "baka na koto o iu na!",
		},
		{
			ID: "5f9d35b6-b95a-4fe9-b857-35ce7bf32c89",
			ProjectID: "865fac1c-f220-489c-a65d-380d0c7f770f",
			Text: "tinted windows",
		},
		{
			ID: "cf24e0ad-ad1b-4724-ba22-3fecc6b76e62",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "omae no aite wa ore da",
		},
		{
			ID: "7aae1b84-317d-4ced-8bde-453c1e99bc03",
			ProjectID: "beaae35c-6a00-4406-a423-9dd9281c15ec",
			Text: "debugging",
		},
		{
			ID: "2eddcb35-56f4-4320-8439-46e1fe312c11",
			ProjectID: "865fac1c-f220-489c-a65d-380d0c7f770f",
			Text: "rattling sound",
		},
		{
			ID: "f26916fd-82f6-4826-9aa4-48cf2915b373",
			ProjectID: "beaae35c-6a00-4406-a423-9dd9281c15ec",
			Text: "virtual callbacks",
		},
		{
			ID: "a1e5686f-d092-48b7-a1e3-535c221a8e46",
			ProjectID: "beaae35c-6a00-4406-a423-9dd9281c15ec",
			Text:
				"The debugger comes with three profilers for your processor, network operations, and video memory.",
		},
		{
			ID: "455c2a76-da9d-4ec6-9105-84b1454438b9",
			ProjectID: "85e49d08-53d6-424f-8030-ba8078242913",
			Text: "A rumble in the skies and an aurora-like spectacle mark the coming of an angel",
		},
		{
			ID: "5fdabe2f-5cac-4366-a6ca-85a0ebc3e191",
			ProjectID: "beaae35c-6a00-4406-a423-9dd9281c15ec",
			Text: "managing shared functionality or data",
		},
		{
			ID: "746d956c-3d0c-4a00-9a47-92948e6c436e",
			ProjectID: "beaae35c-6a00-4406-a423-9dd9281c15ec",
			Text: "function call",
		},
		{
			ID: "86846a0a-daa2-415e-a335-a189663228fb",
			ProjectID: "85e49d08-53d6-424f-8030-ba8078242913",
			Text:
				"Curving branches embraced many trees, and an array of flowers, which blossomed brightly.",
		},
		{
			ID: "3eddb852-0c95-41ac-808f-c388fdb95fa2",
			ProjectID: "85e49d08-53d6-424f-8030-ba8078242913",
			Text: "a hulking being with clear, white eyes",
		},
		{
			ID: "b478bbfd-37aa-4770-915d-d90dae7ed712",
			ProjectID: "865fac1c-f220-489c-a65d-380d0c7f770f",
			Text: "coffeehouses, take-outs and clubs",
		},
		{
			ID: "77658fc3-f2bf-4b46-ac7b-e64983bff78a",
			ProjectID: "85e49d08-53d6-424f-8030-ba8078242913",
			Text: "a pained expression",
		},
		{
			ID: "a7c34a6c-9218-43ba-9621-e714bbcd4143",
			ProjectID: "85e49d08-53d6-424f-8030-ba8078242913",
			Text:
				"Its massive tail ends in a sharp, arrowhead shaped tip and is covered in the same narrow scales as its body.",
		},
		{
			ID: "d24af03c-dc70-4d8e-a498-f08b1c4e433c",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "jibun de kimeru na!",
		},
		{
			ID: "308acb44-812d-4ecb-8eb5-f0dcdaa5c267",
			ProjectID: "865fac1c-f220-489c-a65d-380d0c7f770f",
			Text: "about to need a new transmission",
		},
		{
			ID: "1003d80d-0f0e-48e2-ac61-f95433822bbc",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "Kore wa genjitsu da!",
		},
		{
			ID: "5fb4e045-a5c6-4b0d-86f8-f9658a621808",
			ProjectID: "ed232639-41ec-463a-bffa-6248732d5a0c",
			Text: "sou itte mo",
		},
	];
	const translations = [
		{
			ID: "c90366b8-26a0-4e80-8279-00c002025ca4",
			Text: "chagsaeg chang",
			PhraseID: "5f9d35b6-b95a-4fe9-b857-35ce7bf32c89",
			LanguageID: "e3fe64ed-e336-4d5c-b21c-47cad3ddabca",
			UserID: "3f5687ac-efb6-4341-b0af-6c1b7bb03939",
		},
		{
			ID: "e70a3cf0-2b7f-4740-aa13-0bf3e2fab554",
			Text: "suono tintinnante",
			PhraseID: "2eddcb35-56f4-4320-8439-46e1fe312c11",
			LanguageID: "fe70d42b-8289-443c-a022-8c405865fa83",
			UserID: "9c683a7c-4037-457d-abdb-a76cd1b9d13e",
		},
		{
			ID: "05107963-2a60-471c-926d-13ba89489579",
			Text: "Bring it on!",
			PhraseID: "11133174-8671-4262-9296-32a002899ffa",
			LanguageID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
		},
		{
			ID: "80a85f37-881e-4772-8d91-243210e6184b",
			Text: "crepitio tintinnante",
			PhraseID: "2eddcb35-56f4-4320-8439-46e1fe312c11",
			LanguageID: "fe70d42b-8289-443c-a022-8c405865fa83",
			UserID: "f49715a9-ab92-480d-a589-6f83f8bfb744",
		},
		{
			ID: "857b772d-8e31-423c-8c52-40db9b5b315a",
			Text: "chraplavý zvuk",
			PhraseID: "2eddcb35-56f4-4320-8439-46e1fe312c11",
			LanguageID: "56f00e50-72a0-4e84-a945-4e25304fc4ca",
			UserID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
		},
		{
			ID: "53588c3b-df45-4c0b-b831-6a92084f9c1d",
			Text: "What do you do?",
			PhraseID: "63c296cf-68dd-4f66-8c10-1f0ad77b4edd",
			LanguageID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
			UserID: "0eefeb55-589d-457c-888a-79e8487f3238",
		},
		{
			ID: "8a152577-6a49-4848-b4c9-70304e435581",
			Text: "For the greater good",
			PhraseID: "821288c9-df0d-4536-96f6-1172175502f2",
			LanguageID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
			UserID: "9c683a7c-4037-457d-abdb-a76cd1b9d13e",
		},
		{
			ID: "ad3feb10-b16c-423b-a5af-7f14aa02a3cf",
			Text: "un être énorme avec des yeux clairs et blancs",
			PhraseID: "3eddb852-0c95-41ac-808f-c388fdb95fa2",
			LanguageID: "bb526e85-a278-4d97-8c01-ac8a823a0fb6",
			UserID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
		},
		{
			ID: "a8aa6acd-b345-4a9f-9ab1-7f3a02dbd3cb",
			Text: "What are you doing?",
			PhraseID: "63c296cf-68dd-4f66-8c10-1f0ad77b4edd",
			LanguageID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
			UserID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
		},
		{
			ID: "7b4ec6b2-5879-49c6-bbf1-9dc25c33b901",
			Text: "richiamate virtuali",
			PhraseID: "f26916fd-82f6-4826-9aa4-48cf2915b373",
			LanguageID: "fe70d42b-8289-443c-a022-8c405865fa83",
			UserID: "d7471d38-d89e-45c6-91b6-ab1fe02ecc92",
		},
		{
			ID: "f05cb361-da95-449d-8173-a37c4ec334a1",
			Text: "Hakkiri to shita shiroi me o shite iru karada no oki-sa",
			PhraseID: "3eddb852-0c95-41ac-808f-c388fdb95fa2",
			LanguageID: "79ac9f2f-a26d-4d7a-98e7-c42a91ebd361",
			UserID: "f49715a9-ab92-480d-a589-6f83f8bfb744",
		},
		{
			ID: "2b86a912-d89e-4a65-adf5-b2e5480dd50c",
			Text: "Funktionsaufruf",
			PhraseID: "746d956c-3d0c-4a00-9a47-92948e6c436e",
			LanguageID: "4fc3248a-4dff-42c0-9aef-8b989cd385c7",
			UserID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
		},
		{
			ID: "4e5029f7-2125-4609-984e-b53546a0c9a8",
			Text: "For great justice",
			PhraseID: "821288c9-df0d-4536-96f6-1172175502f2",
			LanguageID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
			UserID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
		},
		{
			ID: "c6e8564a-81e9-427f-b84d-c124b4d14af5",
			Text: "technologická metropole",
			PhraseID: "e40ef2ea-9fb1-49ca-8c53-07d77afaf8c0",
			LanguageID: "56f00e50-72a0-4e84-a945-4e25304fc4ca",
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
		},
		{
			ID: "40c5871e-323f-46fa-a73c-d37fc697a477",
			Text: "virtuelle Rückrufe",
			PhraseID: "f26916fd-82f6-4826-9aa4-48cf2915b373",
			LanguageID: "4fc3248a-4dff-42c0-9aef-8b989cd385c7",
			UserID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
		},
		{
			ID: "c78939e7-8114-4ce6-a66b-d9e56c9c425b",
			Text: "vyklyk funktsiyi",
			PhraseID: "746d956c-3d0c-4a00-9a47-92948e6c436e",
			LanguageID: "e0493aff-90af-4072-ba29-f13811cb5e2b",
			UserID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
		},
		{
			ID: "b649ddaf-5660-466a-81a4-dc84f52e8ce7",
			Text: "ein riesiges Wesen mit klaren, weißen Augen",
			PhraseID: "3eddb852-0c95-41ac-808f-c388fdb95fa2",
			LanguageID: "4fc3248a-4dff-42c0-9aef-8b989cd385c7",
			UserID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
		},
		{
			ID: "656d735d-17aa-462d-95fc-e5ce931ec1b9",
			Text: "Come on!",
			PhraseID: "11133174-8671-4262-9296-32a002899ffa",
			LanguageID: "f3d13d48-71b0-4024-bf2b-a9d4a51c9041",
			UserID: "e1e9d3aa-84f0-486e-b02c-5ac992597f90",
		},
		{
			ID: "1cf0e9ef-f41b-4a93-870b-f1b558823042",
			Text: "tónovaná okna",
			PhraseID: "5f9d35b6-b95a-4fe9-b857-35ce7bf32c89",
			LanguageID: "56f00e50-72a0-4e84-a945-4e25304fc4ca",
			UserID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
		},
		{
			ID: "f39a067d-7833-4493-9211-f8a2ce311bee",
			Text: "une expression douloureuse",
			PhraseID: "77658fc3-f2bf-4b46-ac7b-e64983bff78a",
			LanguageID: "bb526e85-a278-4d97-8c01-ac8a823a0fb6",
			UserID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
		},
		{
			ID: "46f00e27-4232-435c-bb81-fa6e7e8dd048",
			Text: "una metropoli tecnologica",
			PhraseID: "e40ef2ea-9fb1-49ca-8c53-07d77afaf8c0",
			LanguageID: "fe70d42b-8289-443c-a022-8c405865fa83",
			UserID: "d7471d38-d89e-45c6-91b6-ab1fe02ecc92",
		},
	];
	const votes = [
		{
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			TranslationID: "e70a3cf0-2b7f-4740-aa13-0bf3e2fab554",
			IsUpvote: true,
		},
		{
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			TranslationID: "05107963-2a60-471c-926d-13ba89489579",
			IsUpvote: true,
		},
		{
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			TranslationID: "80a85f37-881e-4772-8d91-243210e6184b",
			IsUpvote: false,
		},
		{
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			TranslationID: "8a152577-6a49-4848-b4c9-70304e435581",
			IsUpvote: true,
		},
		{
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			TranslationID: "ad3feb10-b16c-423b-a5af-7f14aa02a3cf",
			IsUpvote: true,
		},
		{
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			TranslationID: "b649ddaf-5660-466a-81a4-dc84f52e8ce7",
			IsUpvote: true,
		},
		{
			UserID: "b7f395e2-b7b8-45b6-8b32-38f5ce9edc2c",
			TranslationID: "f39a067d-7833-4493-9211-f8a2ce311bee",
			IsUpvote: true,
		},
		{
			UserID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
			TranslationID: "05107963-2a60-471c-926d-13ba89489579",
			IsUpvote: true,
		},
		{
			UserID: "b1d9ace5-cf85-45cf-a682-3df1e8650c48",
			TranslationID: "46f00e27-4232-435c-bb81-fa6e7e8dd048",
			IsUpvote: true,
		},
		{
			UserID: "e1e9d3aa-84f0-486e-b02c-5ac992597f90",
			TranslationID: "e70a3cf0-2b7f-4740-aa13-0bf3e2fab554",
			IsUpvote: true,
		},
		{
			UserID: "e1e9d3aa-84f0-486e-b02c-5ac992597f90",
			TranslationID: "8a152577-6a49-4848-b4c9-70304e435581",
			IsUpvote: true,
		},
		{
			UserID: "e1e9d3aa-84f0-486e-b02c-5ac992597f90",
			TranslationID: "ad3feb10-b16c-423b-a5af-7f14aa02a3cf",
			IsUpvote: true,
		},
		{
			UserID: "3f5687ac-efb6-4341-b0af-6c1b7bb03939",
			TranslationID: "e70a3cf0-2b7f-4740-aa13-0bf3e2fab554",
			IsUpvote: true,
		},
		{
			UserID: "3f5687ac-efb6-4341-b0af-6c1b7bb03939",
			TranslationID: "05107963-2a60-471c-926d-13ba89489579",
			IsUpvote: true,
		},
		{
			UserID: "3f5687ac-efb6-4341-b0af-6c1b7bb03939",
			TranslationID: "8a152577-6a49-4848-b4c9-70304e435581",
			IsUpvote: true,
		},
		{
			UserID: "f49715a9-ab92-480d-a589-6f83f8bfb744",
			TranslationID: "e70a3cf0-2b7f-4740-aa13-0bf3e2fab554",
			IsUpvote: true,
		},
		{
			UserID: "0eefeb55-589d-457c-888a-79e8487f3238",
			TranslationID: "ad3feb10-b16c-423b-a5af-7f14aa02a3cf",
			IsUpvote: true,
		},
		{
			UserID: "0eefeb55-589d-457c-888a-79e8487f3238",
			TranslationID: "656d735d-17aa-462d-95fc-e5ce931ec1b9",
			IsUpvote: true,
		},
		{
			UserID: "59ca9cd6-8a47-4d59-9650-7e3921605054",
			TranslationID: "656d735d-17aa-462d-95fc-e5ce931ec1b9",
			IsUpvote: false,
		},
		{
			UserID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
			TranslationID: "a8aa6acd-b345-4a9f-9ab1-7f3a02dbd3cb",
			IsUpvote: true,
		},
		{
			UserID: "ca58a7ac-a4ee-4e0e-b212-98c28ab3d49d",
			TranslationID: "46f00e27-4232-435c-bb81-fa6e7e8dd048",
			IsUpvote: false,
		},
		{
			UserID: "9c683a7c-4037-457d-abdb-a76cd1b9d13e",
			TranslationID: "656d735d-17aa-462d-95fc-e5ce931ec1b9",
			IsUpvote: true,
		},
		{
			UserID: "9c683a7c-4037-457d-abdb-a76cd1b9d13e",
			TranslationID: "46f00e27-4232-435c-bb81-fa6e7e8dd048",
			IsUpvote: true,
		},
		{
			UserID: "d7471d38-d89e-45c6-91b6-ab1fe02ecc92",
			TranslationID: "e70a3cf0-2b7f-4740-aa13-0bf3e2fab554",
			IsUpvote: true,
		},
	];

	// [MockMethood] Simulate server wait time
	function delay(milliseconds) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, milliseconds);
		});
    }
    
    // [MockMethod] Hack to return a copy of the elements
    function copy(object) {
        return JSON.parse(JSON.stringify(object));
    }

    async function getLanguageById(languageId) {
		await delay(200);
		return copy(
            languages.filter((language) => language.ID === languageId)[0]
        );
	}
	
	async function getAllLanguages() {
		await delay(200);
		return copy(
            languages
        );
    }
    
    async function getUserById(userId) {
		await delay(200);
		return copy(
            users.filter((user) => user.ID === userId)[0]
        );
    }

    async function getProjectById(projectId) {
		await delay(200);
		return copy(
            projects.filter((project) => project.ID === projectId)[0]
        );
    }

	async function getAllProjects() {
		await delay(200);
		return copy(
            projects
        );
	}

	async function getAllProjectsByUserId(userId) {
		await delay(200);
		return copy(
            projects.filter((project) => project.UserID === userId)
        );
    }

    async function getPhraseById(phraseId) {
		await delay(200);
		return copy(
            phrases.filter((phrase) => phrase.ID === phraseId)[0]
        );
	}

	async function getAllPhrases() {
		await delay(200);
		return copy(
            phrases
        );
	}

	async function getAllPhrasesByProjectId(projectId) {
		await delay(200);
		return copy(
            phrases.filter((phrase) => phrase.ProjectID === projectId)
        );
	}

	async function getAllTranslationsByPhraseId(phraseId) {
		await delay(200);
		return copy(
            translations.filter((translation) => translation.PhraseID === phraseId)
        );
	}

	async function getAllTranslationsByPhraseIdAndLanguageId(phraseId, languageId) {
		await delay(200);
		return copy(
			translations.filter((translation) => 
				translation.PhraseID === phraseId && translation.LanguageID === languageId)
        );
	}

	async function getNumberOfVotesByTranslationId(translationId) {
		await delay(200);
        return copy(
            votes
                .filter((vote) => vote.TranslationID == translationId)
                .map((currentValue) => (currentValue.IsUpvote ? 1 : -1))
                .reduce((total, currentValue) => total + currentValue, 0)
        );
	}

	return {
		// Languages
		getLanguageById,
		getAllLanguages,
		// Users
		getUserById,
		// Projects
		getProjectById,
		getAllProjects,
		getAllProjectsByUserId,
		// Phrases
		getPhraseById,
		getAllPhrases,
		getAllPhrasesByProjectId,
		// Translations
		getAllTranslationsByPhraseId,
		getAllTranslationsByPhraseIdAndLanguageId,
		// Votes
		getNumberOfVotesByTranslationId,
	};
})();

document.dispatchEvent(new Event("ApiLoaded"));