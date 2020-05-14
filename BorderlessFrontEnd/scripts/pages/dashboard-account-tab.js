import { usersController } from "../controllers/usersController.js";
import { authenticationController } from "../controllers/authenticationController.js";
import { alertUtils } from "../views/utils/alertUtils.js";
import { handleError } from "../errorHandler.js";

document.addEventListener("DOMContentLoaded", async () => {
	window.onDeleteAccountButtonClicked = onDeleteAccountButtonClicked;

	let currentUser = await authenticationController.getAuthenticatedUser();

	initEventListeners();

	renderUserInputFields(currentUser);
	renderDangerArea();
});

function initEventListeners() {
	document.getElementById("updateUserDataButton").onclick = onSaveChangesButtonPushed;
	document.getElementById("updatePasswordButton").onclick = onUpdatePasswordButtonPushed;
}

async function onSaveChangesButtonPushed() {
	try {
		let firstname = document.getElementById("firstNameInput").value;
		let lastname = document.getElementById("lastNameInput").value;
		let email = document.getElementById("emailInput").value;
	
		let updatedUser = await usersController.updateData(firstname, lastname, email);
	
		renderUserInputFields(updatedUser);

		showSuccessAlert("User data updated.");
	} catch (err) {
		handleError(err);
	}
}

async function onUpdatePasswordButtonPushed() {
	try {
		let newPassword = document.getElementById("newPasswordInput").value;
		let updatedUser = await usersController.updatePassword(newPassword);
		renderUserInputFields(updatedUser);

		showSuccessAlert("User password updated.");
	} catch (err) {
		handleError(err);
	}
}

function showSuccessAlert(title, message = "") {
	const id = "successAlert";
	$(`#${id}`).remove();
	$(`#content`).append(alertUtils.createSuccessAlert(id, title, message));
}

async function onDeleteAccountButtonClicked() {
	await usersController.deleteById();
	authorization.logOut();
}

function renderUserInputFields(user) {
	let usernameInput = document.getElementById("usernameInput");
	let firstnameInput = document.getElementById("firstNameInput");
	let lastnameInput = document.getElementById("lastNameInput");
	let emailInput = document.getElementById("emailInput");
	let newPasswordInput = document.getElementById("newPasswordInput");

	usernameInput.value = user.Username;
	firstnameInput.value = user.FirstName;
	lastnameInput.value = user.LastName;
	emailInput.value = user.Email;
	newPasswordInput.value = "";
}

function renderDangerArea() {
	let dangerAreaElement = document.getElementById("accountDangerArea");
	dangerAreaElement.innerHTML = getAccountDagerAreaHTML();
}

function getAccountDagerAreaHTML() {
	return `
    <!-- Danger area acordion (for delete project button) -->
    <div id="accountDangerAreaAcordion" class="accordion" >
        <div class="card border-danger">
            <div class="card-header p-0">
                <h2 class="d-flex mb-0">
                    <button class="btn btn-secondary btn-sm flex-fill text-danger" type="button" data-toggle="collapse" data-target="#collapseTwo">
                        Danger area!
                    </button>
                </h2>
            </div>
            
            <!-- Card body (contains delete account button) -->
            <div id="collapseTwo" class="collapse" data-parent="#accountDangerAreaAcordion">
                <div class="card-body d-flex py-3">
                    <button class="d-flex flex-fill align-items-center btn btn-danger btn-sm rounded shadow-none" onclick="onDeleteAccountButtonClicked()">
                        <span class="">Delete acount</span><span class="flex-fill"></span><span class="material-icons">delete</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}
