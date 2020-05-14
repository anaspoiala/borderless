import {authenticationService} from '../services/authenticationService.js';
import {validator} from './validators/validator.js';

export const authenticationController = (() => {
	async function login(username, password) {
		return await authenticationService.login(username, password);
	}

	async function register(firstName, lastName, email, username, password) {
        validator.validateEmail(email);
        validator.validateUsername(username);
        validator.validatePassword(password);

		return await authenticationService.register(firstName, lastName, email, username, password);
	}
	
	
	async function getAuthenticatedUser() {
		return await authenticationService.getAuthenticatedUser();
	}
	
    
	return {
		login,
		register,
		getAuthenticatedUser
	};
})();
