import { api } from './api.js';

export const projectsService = (() => {

    async function getById(projectId) {
		return await api.makeRequest(
			"GET",
			`${api.PROJECTS_PATH}/${projectId}`
		);
	}

	async function getAll() {
		return await api.makeRequest(
			"GET",
			`${api.PROJECTS_PATH}`
		);
	}

	async function getAllByUserId(userId) {
		return await api.makeRequest(
			"GET",
			`${api.USERS_PATH}/${userId}/${api.PROJECTS_PATH}`
		);
	}

	async function add(title, description, sourceLanguage, targetLanguages) {
		let data = {
			ID: api.EMPTY_GUID,
			UserID: api.EMPTY_GUID,
			Name: title,
			Description: description,
			SourceLanguage: sourceLanguage,
			TargetLanguages: targetLanguages
		};

		return await api.makeRequest(
			"POST",
			`${api.PROJECTS_PATH}`,
			data
		);
	}

	async function updateById(id, title, description, sourceLanguage, targetLanguages) {
		let data = {
			ID: id,
			UserID: api.EMPTY_GUID,
			Name: title,
			Description: description,
			SourceLanguage: sourceLanguage,
			TargetLanguages: targetLanguages
		};

		return await api.makeRequest(
			"PUT",
			`${api.PROJECTS_PATH}/${id}`,
			data
		);
	}

	async function deleteById(id) {
		return await api.makeRequest(
			"DELETE",
			`${api.PROJECTS_PATH}/${id}`
		);
	}

    return {
        getById,
		getAll,
		getAllByUserId,
		add,
		updateById,
		deleteById,
    };
})();