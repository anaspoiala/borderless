import {api} from './api.js';

export const translationsService = (() => {

	async function getAllByPhraseId(phraseId) {
		return await api.makeRequest(
			"GET",
			`${api.PHRASES_PATH}/${phraseId}/${api.TRANSLATIONS_PATH}`
		);
	}

	async function getAllByUserId(userId) {
		return await api.makeRequest(
			"GET",
			`${api.USERS_PATH}/${userId}/${api.TRANSLATIONS_PATH}`
		);
	}

	async function getAllByPhraseIdAndLanguageId(phraseId, languageId) {
		return await api.makeRequest(
			"GET",
			`${api.PHRASES_PATH}/${phraseId}/${api.TRANSLATIONS_PATH}/${languageId}`
		);
	}

	async function getUserRoleByTranslationId(translationId) {
		return await api.makeRequest(
			"GET",
			`${api.TRANSLATIONS_PATH}/${translationId}/getRole`
		);
	}

	async function getById(translationId) {
		return await api.makeRequest(
			"GET",
			`${api.TRANSLATIONS_PATH}/${translationId}`
		);
	}

	async function add(text, phraseId, languageId) {
		let data = {
			ID: api.EMPTY_GUID,
			Text: text,
			PhraseID: phraseId,
			LanguageID: languageId,
			UserID: api.EMPTY_GUID
		};

		return await api.makeRequest(
			"POST",
			`${api.TRANSLATIONS_PATH}`,
			data
		);
	}

	async function updateById(translationId, text) {
		let data = {
			ID: translationId,
			Text: text,
			PhraseID: api.EMPTY_GUID,
			LanguageID: api.EMPTY_GUID,
			UserID: api.EMPTY_GUID
		};

		return await api.makeRequest(
			"PUT",
			`${api.TRANSLATIONS_PATH}/${translationId}`,
			data
		);
	}

	async function deleteById(translationId) {
		return await api.makeRequest(
			"DELETE",
			`${api.TRANSLATIONS_PATH}/${translationId}`
		);
	}

    return {
        getAllByPhraseId,
		getAllByUserId,
		getAllByPhraseIdAndLanguageId,
		getUserRoleByTranslationId,
		getById,
		add,
		updateById,
		deleteById,
    };
})();