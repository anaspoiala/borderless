document.addEventListener("ApiLoaded", async () => {
    let loginUsernameInput = document.getElementById("loginUsernameInput");
    let loginPasswordInput = document.getElementById("loginPasswordInput");
    let rememeberMeCheckbox = document.getElementById("rememberMeCheckbox");

    let loginButton = document.getElementById("loginButton");
    loginButton.onclick = async () => {
        let username = loginUsernameInput.value;
        let password = loginPasswordInput.value;
        let rememberMe = rememeberMeCheckbox.checked;

        let authenticationToken = await api.login(username, password);

        authorization.setAuthToken(authenticationToken.Token, rememberMe);
        window.location = "dashboard.html";
    };

    let registerFirstNameInput = document.getElementById("registerFirstNameInput");
    let registerLastNameInput = document.getElementById("registerLastNameInput");
    let registerEmailInput = document.getElementById("registerEmailInput");
    let registerUsernameInput = document.getElementById("registerUsernameInput");
    let registerPasswordInput = document.getElementById("registerPasswordInput");

    let registerButton = document.getElementById("registerButton");
    registerButton.onclick = async () => {
        let firstName = registerFirstNameInput.value;
        let lastName = registerLastNameInput.value;
        let email = registerEmailInput.value;
        let username = registerUsernameInput.value;
        let password = registerPasswordInput.value;

        let user = await api.register(
            firstName,
            lastName,
            email,
            username,
            password
        );

        console.log(user);
    };

});