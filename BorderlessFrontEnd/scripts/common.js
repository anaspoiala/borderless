const authorization = (() => {
    function setAuthToken(token, useLocalStorage = false) {
        _clearStorage();    

        sessionStorage.authToken = token;
        if (useLocalStorage) {
            localStorage.authToken = token;
        }
    }
    
    function getAuthToken() {
        return sessionStorage.authToken || localStorage.authToken || null;
    }
    
    function isLoggedIn() {
        return getAuthToken() != null;
    }

    function logOut() {
        _clearStorage();
        window.location = "index.html";
    }

    function _clearStorage() {
        delete sessionStorage.authToken;
        delete localStorage.authToken;
    }

    return {
        getAuthToken,
        setAuthToken,
        isLoggedIn,
        logOut
    };
})();

function getNavBarHTML() {
    var unAuthenticatedHTML = `
    <li class="nav-item">
        <a class="nav-link" href="authentication.html">Log in/Register</a>
    </li>
    `;

    var authenticatedHTML = `
    <li class="nav-item">
        <a class="nav-link" href="dashboard.html">Dashboard</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" onclick='authorization.logOut()'>Log out</a>
    </li>
    `;

    var navBarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="index.html">Borderless</a>
            <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor02">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="navbar-collapse collapse" id="navbarColor02" style="">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="all-projects.html">Projects</a>
                    </li>
                    ${authorization.isLoggedIn() ? authenticatedHTML : unAuthenticatedHTML}
                </ul>
            </div>
        </div>
    </nav>
    `;

    return navBarHTML;
}

document.addEventListener("DOMContentLoaded", init);

function init() {
    // Insert bootstrap scripts
    //addScript("https://code.jquery.com/jquery-3.4.1.slim.min.js");
    addScript("https://code.jquery.com/jquery-3.4.1.min.js");
    
    // Workaround to prevent bootstrap script from loading before jquery script
	setTimeout(() => {
		addScript("https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js");
        addScript("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js");
        
        // Insert API script
        addScript("scripts/api.js");
	}, 200);

	// Insert Nav Bar
	document.body.insertAdjacentHTML("afterbegin", getNavBarHTML());
}

function addScript(url) {
	var scriptElem = document.createElement("script");
	scriptElem.src = url;
	document.head.appendChild(scriptElem);
}

function renderLoading(elementId) {
	let element = document.getElementById(elementId);
	element.innerHTML = `<span>Loading...</span>`;
}

function escapeCharacters(str) {
    if (typeof str !== 'string') {
        error('string expected');
    }

    return str.replace(/[&<>"']/g, c =>
        c === '&' ? '&amp;'  :
        c === '<' ? '&lt;'   :
        c === '>' ? '&gt;'   :
        c === '"' ? '&quot;' :
        c === "'" ? '&#39;'  :
        error('not handled')
    );

    function error(m) {
        throw new Error(m);
    }
}

function escapeJSObject(obj) {
    const json = JSON.stringify(obj);
    const json_html = escapeCharacters(json);
    
    return json_html;
}

function getQueryParams() {
	// returns an object containing the search query params
	return window.location.search
		.substr(1) // remove "?" in the begining
		.split("&") // splits params
		.map((param) => param.split("=")) // splits param name from param value into a 2 element array
		.reduce((obj, pair) => ((obj[pair[0]] = pair[1]), obj), {}); // joins name and value pairs into object
}
