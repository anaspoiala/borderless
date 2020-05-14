import { languagesService } from '../services/languagesService.js';
import {validator} from './validators/validator.js';

export const languagesController = (() => {
    async function getById(id) {
		validator.validateGuid(id);
		return await languagesService.getById(id);
	}

	async function getAll() {
		return await languagesService.getAll();
	}

    return {
        getById,
		getAll,
    };
})();