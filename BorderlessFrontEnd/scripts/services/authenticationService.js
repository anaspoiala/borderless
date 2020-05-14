import {api} from './api.js';

export const authenticationService = (() => {
	async function login(username, password) {
		let data = {
			Username: username,
			Password: password,
		}

		return await api.makeRequest(
			"POST",
			`${api.AUTHENTICATION_PATH}/login`,
			data
		);
	}

	async function register(firstName, lastName, email, username, password) {
		let data = {
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			Username: username,
			Password: password,
		}

		return await api.makeRequest(
			"POST",
			`${api.USERS_PATH}`,
			data
		);
	}

	async function getAuthenticatedUser() {
		return await api.makeRequest(
			"GET",
			`${api.USERS_PATH}/current`,
		);
	}
	
    return {
        login,
		register,
		getAuthenticatedUser,
    };
})();