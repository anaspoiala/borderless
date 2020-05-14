import { projectsService } from '../services/projectsService.js';
import { validator } from './validators/validator.js';

export const projectsController = (() => {
	async function getById(id) {
		validator.validateGuid(id);
		return await projectsService.getById(id);
	}

	async function getAll(sorted = false) {
		let projects = await projectsService.getAll();

		if (sorted) _sortProjects(projects);

		return projects;
	}

	async function getAllByUserId(userId, sorted = false) {
		validator.validateGuid(userId);
		let projects = await projectsService.getAllByUserId(userId);

		if (sorted) _sortProjects(projects);

		return projects;
	}

	async function add(title, description, sourceLanguage, targetLanguages) {
		validator.validateProjectTitle(title);
		validator.validateProjectDescription(description);
		validator.validateProjectLanguages(sourceLanguage, targetLanguages);

		return await projectsService.add(title, description, sourceLanguage, targetLanguages);
	}

	async function updateById(id, title, description, sourceLanguage, targetLanguages) {
		validator.validateGuid(id);
		validator.validateProjectTitle(title);
		validator.validateProjectDescription(description);
		validator.validateProjectLanguages(sourceLanguage, targetLanguages);

		return await projectsService.updateById(
			id,
			title,
			description,
			sourceLanguage,
			targetLanguages
		);
	}

	async function deleteById(id) {
		validator.validateGuid(id);
		return await projectsService.deleteById(id);
	}

	function _sortProjects(projects) {
		projects.sort((p1, p2) => p1.Name.localeCompare(p2.Name, "en", { sensitivity: "base" }));
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
