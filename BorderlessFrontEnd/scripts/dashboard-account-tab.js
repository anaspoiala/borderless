document.addEventListener("ApiLoaded", async () => {
    let currentUser = await loadCurrentUser();

    initEventListeners();

    renderUserInputFields(currentUser);
    renderDangerArea();
});

async function loadCurrentUser() {
    return await api.getCurrentUser();
}

function initEventListeners() {
    document.getElementById("updateUserDataButton").onclick = onSaveChangesButtonPushed;
    document.getElementById("updatePasswordButton").onclick = onUpdatePasswordButtonPushed;
}

async function onSaveChangesButtonPushed() {
    let firstname = document.getElementById("firstNameInput").value;
    let lastname = document.getElementById("lastNameInput").value;
    let email = document.getElementById("emailInput").value;
    
    let updatedUser = await api.updateUserData(firstname, lastname, email);

    renderUserInputFields(updatedUser);
}

async function onUpdatePasswordButtonPushed() {
    let newPassword = document.getElementById("newPasswordInput").value;
    let updatedUser = await api.updateUserPassword(newPassword);
    renderUserInputFields(updatedUser);
}

async function onDeleteAccountButtonClicked() {
    await api.deleteUser();
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