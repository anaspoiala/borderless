import { authenticationController } from "../controllers/authenticationController.js";
import { alertUtils } from "../views/utils/alertUtils.js";
import { ValidationError } from "../controllers/errors/validationError.js";

document.addEventListener("DOMContentLoaded", async () => {
	let loginUsernameInput = document.getElementById("loginUsernameInput");
	let loginPasswordInput = document.getElementById("loginPasswordInput");
	let rememeberMeCheckbox = document.getElementById("rememberMeCheckbox");

	let loginButton = document.getElementById("loginButton");
	loginButton.onclick = async () => {
		try {
			let username = loginUsernameInput.value;
			let password = loginPasswordInput.value;
			let rememberMe = rememeberMeCheckbox.checked;

			let authenticationToken = await authenticationController.login(username, password);

			authorization.setAuthToken(authenticationToken.Token, rememberMe);
			window.location = "dashboard.html";
		} catch (err) {
			if (err instanceof ValidationError) {
				$("#dangerAlert").remove(); // remove existing alert, if any
				let alert = alertUtils.createDangerAlert(
					"dangerAlert",
					"Invalid data!",
					err.message
				);
				$("#content").append(alert);
			} else {
				console.log(`Error (${err.name}): ${err.message}`);
				window.location = "error.html";
			}
		}
	};

	let registerFirstNameInput = document.getElementById("registerFirstNameInput");
	let registerLastNameInput = document.getElementById("registerLastNameInput");
	let registerEmailInput = document.getElementById("registerEmailInput");
	let registerUsernameInput = document.getElementById("registerUsernameInput");
	let registerPasswordInput = document.getElementById("registerPasswordInput");

	let registerButton = document.getElementById("registerButton");
	registerButton.onclick = async () => {
		try {
			let firstName = registerFirstNameInput.value;
			let lastName = registerLastNameInput.value;
			let email = registerEmailInput.value;
			let username = registerUsernameInput.value;
			let password = registerPasswordInput.value;

			let user = await authenticationController.register(
				firstName,
				lastName,
				email,
				username,
				password
			);

			// clear inputs
			registerFirstNameInput.value = "";
			registerLastNameInput.value = "";
			registerEmailInput.value = "";
			registerUsernameInput.value = "";
			registerPasswordInput.value = "";

			$("#successAlert").remove(); // remove existing alert, if any
			let alert = alertUtils.createSuccessAlert(
				"successAlert",
				"Registration successful!",
				"Now you can log in and use the application."
			);
			$("#content").append(alert);
		} catch (err) {
			if (err instanceof ValidationError) {
				$("#dangerAlert").remove(); // remove existing alert, if any
				let alert = alertUtils.createDangerAlert(
					"dangerAlert",
					"Invalid data!",
					err.message
				);
				$("#content").append(alert);
			} else {
				console.log(`Error (${err.name}): ${err.message}`);
				//window.location = "error.html";
			}
		}
	};
});
