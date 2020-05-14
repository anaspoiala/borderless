import { translationsService } from '../services/translationsService.js';
import { validator } from './validators/validator.js';

export const translationsController = (() => {
	async function getAllByPhraseId(phraseId) {
		validator.validateGuid(phraseId);
		return await translationsService.getAllByPhraseId(phraseId);
	}

	async function getAllByUserId(userId) {
		validator.validateGuid(userId);
		return await translationsService.getAllByUserId(userId);
	}

	async function getAllByPhraseIdAndLanguageId(phraseId, languageId) {
		validator.validateGuid(phraseId);
		validator.validateGuid(languageId);
		return await translationsService.getAllByPhraseIdAndLanguageId(phraseId, languageId);
	}

	async function getUserRoleByTranslationId(id) {
		validator.validateGuid(id);
		return await translationsService.getUserRoleByTranslationId(id);
	}

	async function getById(id) {
		validator.validateGuid(id);
		return await translationsService.getById(id);
	}

	async function add(text, phraseId, languageId) {
		validator.validateGuid(phraseId);
		validator.validateGuid(languageId);
		validator.validateTranslationText(text);
		return await translationsService.add(text, phraseId, languageId);
	}

	async function updateById(id, text) {
		validator.validateGuid(id);
		validator.validateTranslationText(text);
		return await translationsService.updateById(id, text);
	}

	async function deleteById(id) {
		validator.validateGuid(id);
		return await translationsService.deleteById(id);
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
