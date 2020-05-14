import {api} from './api.js';

export const languagesService = (() => {

    async function getById(languageId) {
		return await api.makeRequest(
			"GET",
			`${api.LANGUAGES_PATH}/${languageId}`
		);
	}

	async function getAll() {
		return await api.makeRequest(
			"GET",
			`${api.LANGUAGES_PATH}`,
		);
	}

    return {
        getById,
		getAll,
    };
})();