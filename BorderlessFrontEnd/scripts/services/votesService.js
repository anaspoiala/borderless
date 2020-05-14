import {api} from './api.js';

export const votesService = (() => {

	async function getAllByTranslationId(translationId) {
		return await api.makeRequest(
			"GET",
			`${api.VOTES_PATH}?userId=&translationId=${translationId}`
		);
	}

	async function getAllByUserId(userId) {
		return await api.makeRequest(
			"GET",
			`${api.VOTES_PATH}?userId=${userId}&translationId=`
		);
	}

	async function getCurrentUserVote(translationId) {
		return await api.makeRequest(
			"GET",
			`${api.VOTES_PATH}/${translationId}`
		);
	}

	async function add(translationId, upvoted) {
		let data = {
			UserID: api.EMPTY_GUID,
			TranslationID: translationId,
			IsUpvote: upvoted 
		};

		return await api.makeRequest(
			"POST",
			`${api.VOTES_PATH}`,
			data
		);
	}

	async function updateById(translationId, upvoted) {
		let data = {
			UserID: api.EMPTY_GUID,
			TranslationID: translationId,
			IsUpvote: upvoted 
		};

		return await api.makeRequest(
			"PUT",
			`${api.VOTES_PATH}/${translationId}`,
			data
		);
	}

	async function deleteById(translationId) {
		return await api.makeRequest(
			"DELETE",
			`${api.VOTES_PATH}/${translationId}`
		);
	}

    return {
		getAllByTranslationId,
		getAllByUserId,
		getCurrentUserVote,
		add,
		updateById, 
		deleteById,
    };
})();