import { phrasesService } from '../services/phrasesService.js';
import { validator } from './validators/validator.js';

export const phrasesController = (() => {
    async function getById(id) {
		return await phrasesService.getById(id);
	}

	async function getAll(sorted = true) {
		let phrases = await phrasesService.getAll();
		if (sorted) _sortPhrases(phrases);
		return phrases;
	}

	async function getAllByProjectId(projectId, sorted = true) {
		let phrases = await phrasesService.getAllByProjectId(projectId);
		if (sorted) _sortPhrases(phrases);
		return phrases;
	}

	async function add(text, projectId) {
        validator.validatePhraseText(text);
        return await phrasesService.add(text, projectId);
	}

	async function updateById(id, text, projectId) {
        validator.validatePhraseText(text);
		return await phrasesService.updateById(id, text, projectId);
	}

	async function deleteById(id) {
		return await phrasesService.deleteById(id);
    }

	function _sortPhrases(phrases) {
		phrases.sort((p1, p2) => p1.Text.localeCompare(p2.Text, "en", { sensitivity: "base" }));
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