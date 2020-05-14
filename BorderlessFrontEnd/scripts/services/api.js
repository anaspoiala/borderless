import { ValidationError } from "../controllers/errors/validationError.js";

export const api = (() => {
	const API_URL = `https://localhost:44303/api`;
	const USERS_PATH = `users`;
	const AUTHENTICATION_PATH = `authentication`;
	const LANGUAGES_PATH = `languages`;
	const PROJECTS_PATH = `projects`;
	const PHRASES_PATH = `phrases`;
	const TRANSLATIONS_PATH = `translations`;
	const VOTES_PATH = `votes`;

	const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

	function _redirectToAuthenticationPage() {
		window.location = "authentication.html";
	}

	function _getHeaders() {
		if (!authorization.isLoggedIn()) {
			return {
				Accept: "application/json; charset=utf-8",
				"Content-Type": "application/json; charset=utf-8"
			};
		} else {
			return {
				Accept: "application/json; charset=utf-8",
				Authorization: `Bearer ${authorization.getAuthToken()}`,
				"Content-Type": "application/json; charset=utf-8"
			};
		}
	}

	async function _checkIfLoggedIn() {
		return await makeRequest(
			"GET",
			`${AUTHENTICATION_PATH}/isLoggedIn`,
			null,
			false
		);
    }
    
	async function _handleRequest(ajax, checkLogin) {
		try {
			return await $.when(ajax);
		} catch (err) {
			console.log(err);

			if (err.status === 400) {
				throw new ValidationError(err.responseText);
			}

			if (!checkLogin){
				throw err;
			}
			if (await _checkIfLoggedIn()) {
				throw err;
			} else {
				_redirectToAuthenticationPage();
			}
		}
	}

	async function makeRequest(method, path, data = null, checkLogin = true) {

		let request = $.ajax({
			method,
			url: `${API_URL}/${path}`,
			headers: _getHeaders(),
			data: JSON.stringify(data),
		});

		let result = await _handleRequest(request, checkLogin);

		return result;
	}

    return {
        AUTHENTICATION_PATH,
        LANGUAGES_PATH,
        USERS_PATH,
        PROJECTS_PATH,
        PHRASES_PATH,
        TRANSLATIONS_PATH,
        VOTES_PATH,
        EMPTY_GUID,
        makeRequest,
	};
})();

//document.dispatchEvent(new Event("ApiLoaded"));
