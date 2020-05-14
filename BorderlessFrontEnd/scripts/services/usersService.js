import {api} from './api.js';

export const usersService = (() => {

    async function getById(userId) {
		return await api.makeRequest(
			"GET",
			`${api.USERS_PATH}/${userId}`,
		);
	}

	async function updateData(firsname, lastname, email) {
		let data = {
			FirstName: firsname,
			LastName: lastname,
			Email: email
		};

		return await api.makeRequest(
			"PUT",
			`${api.USERS_PATH}`,
			data
		);
	}

	async function updatePassword(newPassword) {
		let data = {
			Password: newPassword
		};

		return await api.makeRequest(
			"PUT",
			`${api.USERS_PATH}/updatePassword`,
			data
		);
	}

	async function deleteById() {
		return await api.makeRequest(
			"DELETE",
			`${api.USERS_PATH}`
		);
	}

    return {
        getById,
		updateData,
		updatePassword,
		deleteById,
    };
})();