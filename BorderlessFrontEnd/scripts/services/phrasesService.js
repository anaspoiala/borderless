import {api} from './api.js';

export const phrasesService = (() => {

    async function getById(phraseId) {
		return await api.makeRequest(
			"GET",
			`${api.PHRASES_PATH}/${phraseId}`
		);
	}

	async function getAll() {
		return await api.makeRequest(
			"GET",
			`${api.PHRASES_PATH}`
		);
	}

	async function getAllByProjectId(projectId) {
		return await api.makeRequest(
			"GET",
			`${api.PROJECTS_PATH}/${projectId}/${api.PHRASES_PATH}`
		);
	}

	async function add(text, projectId) {
		let data = {
			ID: api.EMPTY_GUID,
			ProjectID: projectId,
			Text: text
		};

		return await api.makeRequest(
			"POST",
			`${api.PHRASES_PATH}`,
			data
		);
	}

	async function updateById(phraseId, text, projectId) {
		let data = {
			ID: api.EMPTY_GUID,
			ProjectID: projectId,
			Text: text
		};

		return await api.makeRequest(
			"PUT",
			`${api.PHRASES_PATH}/${phraseId}`,
			data
		);
	}

	async function deleteById(phraseId) {
		return await api.makeRequest(
			"DELETE",
			`${api.PHRASES_PATH}/${phraseId}`
		);
	}

    return {
        getById,
		getAll,
		getAllByProjectId,
		add,
		updateById,
		deleteById,
    };
})();