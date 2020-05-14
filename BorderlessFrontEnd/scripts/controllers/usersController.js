import { usersService } from '../services/usersService.js';
import { validator } from './validators/validator.js';

export const usersController = (() => {

    async function getById(userId) {
        validator.validateGuid(userId);
		return await usersService.getById(userId);
	}

	async function updateData(firsname, lastname, email) {
        validator.validateEmail(email);
		return await usersService.updateData(firsname, lastname, email);
	}

	async function updatePassword(newPassword) {
        validator.validatePassword(newPassword);
		return await usersService.updatePassword(newPassword);
	}

	async function deleteById() {
		return await usersService.deleteById();
	}

    return {
        getById,
		updateData,
		updatePassword,
		deleteById,
    };
})();