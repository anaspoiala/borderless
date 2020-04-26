let allLanguages = [];
let currentlySelectedProject = null; 


document.addEventListener("ApiLoaded", async () => {

    //let userId = "d7471d38-d89e-45c6-91b6-ab1fe02ecc92"; // AnnikaRice
    let userId = "3f5687ac-efb6-4341-b0af-6c1b7bb03939"; // TakumiSuzuki

    renderProjectsListLoading();

    allLanguages = await loadAllLanguages();

    let projects = await loadAllProjectsByUserId(userId);
    renderProjectsTab(projects);

});

// UI Event Handlers

async function onProjectClicked(projectId) {
    renderSelectedProjectLoading();
    currentlySelectedProject = await api.getProjectById(projectId);
    let phrases = await loadAllPhrasesByProjectId(projectId);
    renderProjectDetailsPanel(currentlySelectedProject, phrases);

}

async function onEditButtonClicked() {
    renderSelectedProjectLoading();
    let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
    renderProjectEditPanel(currentlySelectedProject, allLanguages, phrases);
}

async function onSaveButtonClicked() {
    renderSelectedProjectLoading();
    let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
    renderProjectDetailsPanel(currentlySelectedProject, phrases);
}

async function onCancelButtonClicked() {
    // show popup with confirmation
    // on confirm, show project-readonly
    renderSelectedProjectLoading();
    let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
    renderProjectDetailsPanel(currentlySelectedProject, phrases);
}

async function onDeleteButtonClicked() {
    // show popup with confirmation
    // on confirm, show project-readonly
    renderSelectedProjectLoading();
    let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
    renderProjectDetailsPanel(currentlySelectedProject, phrases);
}

// API Calls

async function loadAllProjectsByUserId(userId) {
    let projects = await api.getAllProjectsByUserId(userId);
    projects.sort(
        (p1, p2) => p1.Name.localeCompare(p2.Name, "en", { sensitivity: "base" })
    );
    return projects;
}

async function loadAllLanguages() {
    let languages = await api.getAllLanguages();
    languages.sort(
        (l1, l2) => l1.Name.localeCompare(l2.Name, "en", { sensitivity: "base" })
    );
    return languages;
}

async function loadAllPhrasesByProjectId(projectId) {
    let phrases = await api.getAllPhrasesByProjectId(projectId);
    phrases.sort(
        (p1, p2) => p1.Text.localeCompare(p2.Text, "en", { sensitivity: "base" })
    );
    return phrases;
}

// HTML Rendering Methods

function renderProjectsListLoading() {
    renderLoading("projectsList");
}

function renderSelectedProjectLoading() {
    renderLoading("selectedProjectDetails");
}

function renderProjectsTab(projects) {
    renderProjectsList(projects);
}

function renderProjectsList(projects) {
	let projectsList = document.getElementById("projectsList");
    let projectsListHTML = "";
    
    if (projects.length === 0) {
        projectsListHTML = `<div>No projects yet.</div>`
    } else {
        for (let proj of projects) {
            let projectHTML = getProjectListItemHTML(proj);
            projectsListHTML += projectHTML;
        }
    }

	projectsList.innerHTML = projectsListHTML;
}

function getProjectListItemHTML(project) {
	let projectHTML = `<a class="list-group-item list-group-item-action" onclick="onProjectClicked('${project.ID}')">${project.Name}</a>`;
	return projectHTML;
}

function renderProjectDetailsPanel(project, phrases) {
    let projectElement = document.getElementById("selectedProjectDetails");

    let title = getProjectTitleHTML(project.Name);
	let descr = getProjectDescriptionHTML(project.Description);
	let sourceLang = getProjectSourceLanguageHTML(project.SourceLanguage);
	let targetLangs = getProjectTargetLanguagesHTML(project.TargetLanguages);
    let phrasesList = renderPhrasesListForProjectDetailsPanel(phrases);


    let projectHTML = `
    <div id="projectDetails" class="">
        <div class="d-flex mb-3">
            <button id="editProjectButton" class="d-flex flex-fill align-items-center btn btn-info rounded shadow-none" onclick="onEditButtonClicked()">
                <span class="">Edit project</span><span class="flex-fill"></span><span class="material-icons">edit</span>
            </button>
        </div>

        <div id="projectTitle" class="text-justify">${title}</div>

        <div id="projectDescription" class="text-justify">${descr}</div>

        <div class="text-capitalize lead mt-3">Source language</div>
        <div id="projectSourceLanguage">${sourceLang}</div>

        <div class="text-capitalize lead mt-3">Target languages</div>
        <div id="projectTargetLanguages">${targetLangs}</div>

        <!-- Project's phrases list and add new phrase textbox -->
        <div id="projectPhrasesZone" class="my-5">

            <h4 class="my-3">Phrases</h4>

            <!-- The input field and add button for new phrases -->
            <div id="addNewPhraseInput" class="mb-3">
                <textarea id="newPhraseText" class="form-control shadow-none mb-1" rows="2" placeholder="Enter new phrase"></textarea>
                <div class="d-flex bd-highlight align-items-center">
                    <span class="flex-fill bd-highlight"></span>
                    <button id="submitPhraseButton" type="button" class="btn btn-primary shadow-none">Add phrase</button>
                </div>
            </div>

            <!-- The list of phrases in the project, with edit and delete options -->
            <div>
                <ul id="projectPhrasesList" class="list-group">
                    ${phrasesList}
                </ul>
            </div>
        </div>

    </div>
    `;

    projectElement.innerHTML = projectHTML;
}


function getProjectTitleHTML(title) {
	return `<h2>${title}</h2>`;
}

function getProjectDescriptionHTML(description) {
	let descriptionHTML = "";
	let paragraphs = description.split("\n");

	for (let p of paragraphs) {
		descriptionHTML += `<div>${p}</div>`;
	}

	return descriptionHTML;
}

function getProjectSourceLanguageHTML(sourceLanguage) {
	return `<div>${sourceLanguage.Name}, ${sourceLanguage.Abbreviation}</div>`;
}

function getProjectTargetLanguagesHTML(targetLanguages) {
	let targetLanguagesHTML = "";

	for (let tl of targetLanguages) {
		targetLanguagesHTML += `<div>${tl.Name}, ${tl.Abbreviation}</div>`;
	}

	return targetLanguagesHTML;
}

function renderProjectEditPanel(project, allLangauges, phrases) {
    let projectEditForm = `
    <div>
        <!-- Project name input -->
        <div class="form-group ">${getProjectNameInputHTML(project.Name)}</div>
        
        <!-- Project description input -->
        <div class="form-group">${getProjectDescriptionInputHTML(project.Description)}</div>

        <!-- Project source langauge input  -->
        <div class="form-group">
            <div class="d-flex align-items-baseline">
                <label for="languageDropdown" class="text-nowrap">Source language</label>
                <select id="languageDropdown" class="flex-fill form-control rounded ml-2 py-1">
                    ${getProjectSourceLanguageOptions(allLangauges, project.SourceLanguage.ID)}
                </select>
            </div>
        </div>

        <!-- Project target languages input -->
        <div class="form-group">
            <div>Target languages</div>

            <div class="resizeablePanel border rounded">
                <div class="container">
                    <div class="row">
                        ${getProjectTargetLanguagesCheckboxes(allLangauges, project.TargetLanguages)}
                    </div>
                </div>
            </div>
            
        </div>

        <div id="editablePhrasesList" class="my-5">
            <h4 class="my-3">Phrases</h4>
            ${getEditablePhrasesList(phrases)}
        </div>

        ${getSaveCancelAndDeleteButtonsHTML()}
    </div>
    `;

    let projectElement = document.getElementById("selectedProjectDetails");
    projectElement.innerHTML = projectEditForm;
}

function getProjectNameInputHTML(name) {
    return `<input id="projectName" class="form-control rounded" type="text" value="${name}" placeholder="Enter project title">`
}

function getProjectDescriptionInputHTML(description) {
    return `<textarea id="projectDescription" class="form-control rounded" rows="5" placeholder="Enter project's description">${description}</textarea>`
}

function getProjectSourceLanguageOptions(languages, selectedLanguageId=undefined) {
    var optionsHTML = ``;

    for (let language of languages) {
        let selected = ( selectedLanguageId !== undefined && language.ID === selectedLanguageId) 
            ? `selected`
            : ``;

        optionsHTML += `<option value="${language.ID}" ${selected}>${language.Name}</option>`;
    }

    return optionsHTML;
}

function getProjectTargetLanguagesCheckboxes(languages, selectedTargetLanguages = []) {
    let checkboxesHTML = ``;

    for (let lang of languages) {
        let checked = ``;
        if (selectedTargetLanguages.find((l) => l.ID === lang.ID) != null) {
            checked = `checked`;
        } 

        checkboxesHTML += `
        <div title="${lang.Name} (${lang.Abbreviation})" class="custom-control custom-checkbox col-md-6 col-lg-4 overflow-hidden pl-5 py-1">
            <input  id="opt-${lang.Abbreviation}" type="checkbox" class="custom-control-input" ${checked}>
            <label for="opt-${lang.Abbreviation}" class="custom-control-label">${lang.Name}</label>
        </div>
        `;
    }

    return checkboxesHTML;
}

function getSaveCancelAndDeleteButtonsHTML() {
    let buttonsHTML = `
    <!-- Save, Cancel and Delete buttons -->
    <div id="saveCancelAndDeleteButtons" class="">
        <!-- Save and Cancel buttons -->
        <div class="d-flex my-2">
            <button id="saveChangesButton" class="d-flex flex-fill align-items-center btn btn-success rounded shadow-none mr-1" onclick="onSaveButtonClicked()">
                <span class="">Save</span><span class="flex-fill"></span><span class="material-icons">save</span>
            </button>
            <button id="cancelChangesButton" class="d-flex flex-fill align-items-center btn btn-warning rounded shadow-none ml-1" onclick="onCancelButtonClicked()">
                <span class="">Cancel</span><span class="flex-fill"></span><span class="material-icons">cancel</span>
            </button>
        </div>
        ${getDangerAreaAcordion()}
    </div>
    `;

    return buttonsHTML;
}

function getDangerAreaAcordion() {
    let dangerAreaHTML = `
    <!-- Danger area acordion (for delete project button) -->
    <div id="dangerAreaAcordion" class="accordion" >
        <div class="card border-danger">
            <div class="card-header p-0">
                <h2 class="d-flex mb-0">
                    <button class="btn btn-secondary btn-sm flex-fill text-danger" type="button" data-toggle="collapse" data-target="#collapseOne">
                        Danger area!
                    </button>
                </h2>
            </div>
            
            <!-- Card body (contains delete project button) -->
            <div id="collapseOne" class="collapse" data-parent="#dangerAreaAcordion">
                <div class="card-body d-flex py-3">
                    <button class="d-flex flex-fill align-items-center btn btn-danger btn-sm rounded shadow-none" onclick="onDeleteButtonClicked()">
                        <span class="">Delete project</span><span class="flex-fill"></span><span class="material-icons">delete</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

    return dangerAreaHTML;
}

function renderPhrasesListForProjectDetailsPanel(phrases) {
	let phrasesHTML = "";

	for (let phrase of phrases) {
		phrasesHTML += `<li class="list-group-item">${phrase.Text}</li>`;
	}

	return phrasesHTML;
}

function getEditablePhrasesList(phrases) {
    var phraseListHTML = ``;

    for (let p of phrases) {
        let phraseHTML = `
        <div class="phraseEditInputs form-group input-group border m-0 my-1">
            <textarea type="text" class="form-control shadow-none" rows="2">${p.Text}</textarea>
            <div class="input-group-append">
                <span class="input-group-text material-icons py-4 px-4">delete</span>
            </div>
        </div>
        `;
        phraseListHTML += phraseHTML;
    }

    return phraseListHTML;
}