import { votesService } from '../services/votesService.js';
import { validator } from './validators/validator.js';

export const votesController = (() => {
	async function getNumberOfVotesByTranslationId(translationId) {
        validator.validateGuid(translationId);

		let result = await votesService.getAllByTranslationId(translationId);

		return result
			.map((currentValue) => (currentValue.IsUpvote ? 1 : -1))
			.reduce((total, currentValue) => total + currentValue, 0);
	}

	async function getAllByTranslationId(translationId) {
        validator.validateGuid(translationId);
		return await votesService.getAllByTranslationId(translationId);
	}

	async function getAllByUserId(userId) {
        validator.validateGuid(userId);
		return await votesService.getAllByUserId(userId);
	}

	async function getCurrentUserVote(translationId) {
        validator.validateGuid(translationId);
		return await votesService.getCurrentUserVote(translationId);
	}

	async function add(translationId, upvoted) {
        validator.validateGuid(translationId);
		return await votesService.add(translationId, upvoted);
	}

	async function updateById(translationId, upvoted) {
        validator.validateGuid(translationId);
		return await votesService.updateById(translationId, upvoted);
	}

	async function deleteById(translationId) {
        validator.validateGuid(translationId);
		return await votesService.deleteById(translationId);
	}

	return {
		getNumberOfVotesByTranslationId: getNumberOfVotesByTranslationId,
		getAllByTranslationId,
		getAllByUserId,
		getCurrentUserVote,
		add,
		updateById,
		deleteById,
	};
})();
