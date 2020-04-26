var navBarHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">Borderless</a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="navbar-collapse collapse" id="navbarColor02" style="">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#">Projects<span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
    </div>
</nav>
`;

document.addEventListener("DOMContentLoaded", init);

function init() {
	// Insert bootstrap scripts
    addScript("https://code.jquery.com/jquery-3.4.1.slim.min.js");
    
    // Workaround to prevent bootstrap scipt from loading before jquery script
	setTimeout(() => {
		addScript("https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js");
		addScript("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js");
	}, 200);

	// Insert Nav Bar
	document.body.insertAdjacentHTML("afterbegin", navBarHTML);

	// Insert API script
	addScript("scripts/api.js");
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