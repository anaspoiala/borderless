const api = (() => {
	const API_URL = `https://localhost:44303/api`;
	const USERS_PATH = `users`;
	const AUTHENTICATION_PATH = `authentication`;
	const LANGUAGES_PATH = `languages`;
	const PROJECTS_PATH = `projects`;
	const PHRASES_PATH = `phrases`;
	const TRANSLATIONS_PATH = `translations`;
	const VOTES_PATH = `votes`;

	const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

	// ------------------------------------------------------------

	function _redirectToAuthenticationPage() {
		console.log('redirecting', new Error());
		window.location = "authentication.html";
	}

	function _getHeaders() {
		if (!authorization.isLoggedIn()) {
			return {
				Accept: "application/json; charset=utf-8",
				"Content-Type": "application/json; charset=utf-8"
			};
		} else {
			return {
				Accept: "application/json; charset=utf-8",
				Authorization: `Bearer ${authorization.getAuthToken()}`,
				"Content-Type": "application/json; charset=utf-8"
			};
		}
	}

	async function _handleRequest(ajax, checkLogin) {
		try {
			return await $.when(ajax);
		} catch (e) {
			console.log(e);

			if (!checkLogin){
				throw e;
			}
			if (await _checkIfLoggedIn()) {
				throw e;
			} else {
				_redirectToAuthenticationPage();
			}
		}
	}

	async function _makeRequest(method, path, data = null, checkLogin = true) {

		let request = $.ajax({
			method,
			url: `${API_URL}/${path}`,
			headers: _getHeaders(),
			data: JSON.stringify(data),
		});

		let result = await _handleRequest(request, checkLogin);

		return result;
	}

	async function _checkIfLoggedIn() {
		return await _makeRequest(
			"GET",
			`${AUTHENTICATION_PATH}/isLoggedIn`,
			null,
			false
		);
	}

	// ------------------------------------------------------------

	async function login(username, password) {
		let data = {
			Username: username,
			Password: password,
		}

		return await _makeRequest(
			"POST",
			`${AUTHENTICATION_PATH}/login`,
			data
		);
	}

	async function register(firstName, lastName, email, username, password) {
		let data = {
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			Username: username,
			Password: password,
		}

		return await _makeRequest(
			"POST",
			`${USERS_PATH}`,
			data
		);
	}

	// Languages

	async function getLanguageById(languageId) {
		return await _makeRequest(
			"GET",
			`${LANGUAGES_PATH}/${languageId}`
		);
	}

	async function getAllLanguages() {
		return await _makeRequest(
			"GET",
			`${LANGUAGES_PATH}`,
		);
	}

	// Users

	async function getUserById(userId) {
		return await _makeRequest(
			"GET",
			`${USERS_PATH}/${userId}`,
		);
	}

	async function getCurrentUser() {
		return await _makeRequest(
			"GET",
			`${USERS_PATH}/current`,
		);
	}
	
	async function updateUserData(firsname, lastname, email) {
		let data = {
			FirstName: firsname,
			LastName: lastname,
			Email: email
		};

		return await _makeRequest(
			"PUT",
			`${USERS_PATH}`,
			data
		);
	}

	async function updateUserPassword(newPassword) {
		let data = {
			Password: newPassword
		};

		return await _makeRequest(
			"PUT",
			`${USERS_PATH}/updatePassword`,
			data
		);
	}

	async function deleteUser() {
		return await _makeRequest(
			"DELETE",
			`${USERS_PATH}`
		);
	}

	// Projects

	async function getProjectById(projectId) {
		return await _makeRequest(
			"GET",
			`${PROJECTS_PATH}/${projectId}`
		);
	}

	async function getAllProjects() {
		return await _makeRequest(
			"GET",
			`${PROJECTS_PATH}`
		);
	}

	async function getAllProjectsByUserId(userId) {
		return await _makeRequest(
			"GET",
			`${USERS_PATH}/${userId}/${PROJECTS_PATH}`
		);
	}

	async function addProject(title, description, sourceLanguage, targetLanguages) {
		let data = {
			ID: EMPTY_GUID,
			UserID: EMPTY_GUID,
			Name: title,
			Description: description,
			SourceLanguage: sourceLanguage,
			TargetLanguages: targetLanguages
		};

		return await _makeRequest(
			"POST",
			`${PROJECTS_PATH}`,
			data
		);
	}

	async function updateProject(id, title, description, sourceLanguage, targetLanguages) {
		let data = {
			ID: id,
			UserID: EMPTY_GUID,
			Name: title,
			Description: description,
			SourceLanguage: sourceLanguage,
			TargetLanguages: targetLanguages
		};

		return await _makeRequest(
			"PUT",
			`${PROJECTS_PATH}/${id}`,
			data
		);
	}

	async function deleteProject(id) {
		return await _makeRequest(
			"DELETE",
			`${PROJECTS_PATH}/${id}`
		);
	}

	// Phrases

	async function getPhraseById(phraseId) {
		return await _makeRequest(
			"GET",
			`${PHRASES_PATH}/${phraseId}`
		);
	}

	async function getAllPhrases() {
		return await _makeRequest(
			"GET",
			`${PHRASES_PATH}`
		);
	}

	async function getAllPhrasesByProjectId(projectId) {
		return await _makeRequest(
			"GET",
			`${PROJECTS_PATH}/${projectId}/${PHRASES_PATH}`
		);
	}

	async function addPhrase(text, projectId) {
		let data = {
			ID: EMPTY_GUID,
			ProjectID: projectId,
			Text: text
		};

		return await _makeRequest(
			"POST",
			`${PHRASES_PATH}`,
			data
		);
	}

	async function updatePhrase(phraseId, text, projectId) {
		let data = {
			ID: EMPTY_GUID,
			ProjectID: projectId,
			Text: text
		};

		return await _makeRequest(
			"PUT",
			`${PHRASES_PATH}/${phraseId}`,
			data
		);
	}

	async function deletePhrase(phraseId) {
		return await _makeRequest(
			"DELETE",
			`${PHRASES_PATH}/${phraseId}`
		);
	}


	// Translations

	async function getAllTranslationsByPhraseId(phraseId) {
		return await _makeRequest(
			"GET",
			`${PHRASES_PATH}/${phraseId}/${TRANSLATIONS_PATH}`
		);
	}

	async function getAllTranslationsByUserId(userId) {
		return await _makeRequest(
			"GET",
			`${USERS_PATH}/${userId}/${TRANSLATIONS_PATH}`
		);
	}

	async function getAllTranslationsByPhraseIdAndLanguageId(phraseId, languageId) {
		return await _makeRequest(
			"GET",
			`${PHRASES_PATH}/${phraseId}/${TRANSLATIONS_PATH}/${languageId}`
		);
	}

	async function getUserRoleByTranslationId(translationId) {
		return await _makeRequest(
			"GET",
			`${TRANSLATIONS_PATH}/${translationId}/getRole`
		);
	}

	async function getTranslationById(translationId) {
		return await _makeRequest(
			"GET",
			`${TRANSLATIONS_PATH}/${translationId}`
		);
	}

	async function addTranslation(text, phraseId, languageId) {
		let data = {
			ID: EMPTY_GUID,
			Text: text,
			PhraseID: phraseId,
			LanguageID: languageId,
			UserID: EMPTY_GUID
		};

		return await _makeRequest(
			"POST",
			`${TRANSLATIONS_PATH}`,
			data
		);
	}

	async function updateTranslation(translationId, text) {
		let data = {
			ID: translationId,
			Text: text,
			PhraseID: EMPTY_GUID,
			LanguageID: EMPTY_GUID,
			UserID: EMPTY_GUID
		};

		return await _makeRequest(
			"PUT",
			`${TRANSLATIONS_PATH}/${translationId}`,
			data
		);
	}

	async function deleteTranslation(translationId) {
		return await _makeRequest(
			"DELETE",
			`${TRANSLATIONS_PATH}/${translationId}`
		);
	}

	// Votes

	async function getNumberOfVotesByTranslationId(translationId) {
		let result =  await _makeRequest(
			"GET",
			`${VOTES_PATH}?userId=&translationId=${translationId}`
		);

		return result
			.map((currentValue) => (currentValue.IsUpvote ? 1 : -1))
			.reduce((total, currentValue) => total + currentValue, 0);
	}

	async function getAllVotesByTranslationId(translationId) {
		return await _makeRequest(
			"GET",
			`${VOTES_PATH}?userId=&translationId=${translationId}`
		);
	}

	async function getAllVotesByUserId(userId) {
		return await _makeRequest(
			"GET",
			`${VOTES_PATH}?userId=${userId}&translationId=`
		);
	}

	async function getCurrentUserVote(translationId) {
		return await _makeRequest(
			"GET",
			`${VOTES_PATH}/${translationId}`
		);
	}

	async function addVote(translationId, upvoted) {
		let data = {
			UserID: EMPTY_GUID,
			TranslationID: translationId,
			IsUpvote: upvoted 
		};

		return await _makeRequest(
			"POST",
			`${VOTES_PATH}`,
			data
		);
	}

	async function updateVote(translationId, upvoted) {
		let data = {
			UserID: EMPTY_GUID,
			TranslationID: translationId,
			IsUpvote: upvoted 
		};

		return await _makeRequest(
			"PUT",
			`${VOTES_PATH}/${translationId}`,
			data
		);
	}

	async function deleteVote(translationId) {
		return await _makeRequest(
			"DELETE",
			`${VOTES_PATH}/${translationId}`
		);
	}



	return {
		login,
		register,
		// Languages
		getLanguageById,
		getAllLanguages,
		// Users
		getUserById,
		getCurrentUser,
		updateUserData,
		updateUserPassword,
		deleteUser,
		// Projects
		getProjectById,
		getAllProjects,
		getAllProjectsByUserId,
		addProject,
		updateProject,
		deleteProject,
		// Phrases
		getPhraseById,
		getAllPhrases,
		getAllPhrasesByProjectId,
		addPhrase,
		updatePhrase,
		deletePhrase,
		// Translations
		getAllTranslationsByPhraseId,
		getAllTranslationsByUserId,
		getAllTranslationsByPhraseIdAndLanguageId,
		getUserRoleByTranslationId,
		getTranslationById,
		addTranslation,
		updateTranslation,
		deleteTranslation,
		// Votes
		getNumberOfVotesByTranslationId,
		getAllVotesByTranslationId,
		getAllVotesByUserId,
		getCurrentUserVote,
		addVote,
		updateVote, 
		deleteVote,
	};
})();

document.dispatchEvent(new Event("ApiLoaded"));
