document.addEventListener("ApiLoaded", init);

async function init() {
	renderLoadingProjectsList();
	let projects = await loadProjects();
	renderProjectsList(projects);
}

// API Calls

async function loadProjects() {
	let projects = await api.getAllProjects();
	projects.sort((p1, p2) => p1.Name.localeCompare(p2.Name, "en", { sensitivity: "base" }));
	return projects;
}

// HTML Render Methods

function renderProjectsList(projects) {
	let projectsList = document.getElementById("projectsList");
	let projectsListItemsHTML = "";

	if (projects.length === 0) {
		projectsListItemsHTML = "No projects yet.";
	} else {
		for (let project of projects) {
			var projectHTML = renderProject(project);
			projectsListItemsHTML += `<li class="list-group-item">${projectHTML}</li>`;
		}
	}

	projectsList.innerHTML = projectsListItemsHTML;
}

function renderProject(project) {
	let targetLanguagesString = "";
	let targetLanguages = project.TargetLanguages;

	targetLanguages.sort((tl1, tl2) =>
		tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
	);

	let length = targetLanguages.length;

	if (length == 1) {
		targetLanguagesString = `${targetLanguages[0].Name}`;
	} else if (length == 2) {
		targetLanguagesString = `${targetLanguages[0].Name} and ${targetLanguages[1].Name}`;
	} else {
		let remaining = length - 2;
		targetLanguagesString = `${targetLanguages[0].Name}, ${targetLanguages[1].Name} and ${remaining} others`;
	}

	var projectHTML = `
    <div class='project row'>
        <div class="col-sm-8">
            <div class="projectTitle lead">${project.Name}</div>
            <div class="projectDescription text-muted text-truncate">${project.Description}</div>
        </div> 
        <div class="projectLanguages col-sm-4">${project.SourceLanguage.Name} > ${targetLanguagesString}</div>
    </div>
    `;

	return projectHTML;
}

function renderLoadingProjectsList() {
	renderLoading("projectsList");
}
