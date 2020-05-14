import { projectsController } from "../controllers/projectsController.js";
import { phrasesController } from "../controllers/phrasesController.js";
import { authenticationController } from "../controllers/authenticationController.js";
import { languagesController } from "../controllers/languagesController.js";
import { handleError } from "../errorHandler.js";
import { alertUtils } from "../views/utils/alertUtils.js";

let allLanguages = [];
let currentlySelectedProject = null;

document.addEventListener("DOMContentLoaded", async () => {
	// make some functions global
	window.onProjectClicked = onProjectClicked;
	window.onEditButtonClicked = onEditButtonClicked;
	window.onSaveButtonClicked = onSaveButtonClicked;
	window.onCancelButtonClicked = onCancelButtonClicked;
	window.onDeleteButtonClicked = onDeleteButtonClicked;
	window.onAddPhraseButtonPressed = onAddPhraseButtonPressed;
	window.onSavePhraseButtonPressed = onSavePhraseButtonPressed;
	window.onDeletePhraseButtonPressed = onDeletePhraseButtonPressed;

	let currentUser = await loadCurrentUser();
	let userId = currentUser.ID;

	renderProjectsListLoading();

	allLanguages = await loadAllLanguages();

	let projects = await loadAllProjectsByUserId(userId);
	renderProjectsList(projects);

	$("#newProjectModal").on("shown.bs.modal", function (e) {
		console.log("modal");
		let modalBody = document.getElementById("newProjectModalBody");
		modalBody.innerHTML = renderModalContent(allLanguages);
	});

	let modalCreateProjectButton = document.getElementById("modalCreateProjectButton");

	modalCreateProjectButton.onclick = async () => {
		try {
			let titleInput = document.getElementById("modalProjectName");
			let descriptionInput = document.getElementById("modalProjectDescription");
			let sourceLangDropdown = document.getElementById("modalLanguageDropdown");
			let targetLangCheckboxes = document.getElementById("modalTargetLanguagesCheckboxes");

			let title = titleInput.value;
			let description = descriptionInput.value;
			let sourceLanguage = getSelectedSourceLanguage(sourceLangDropdown);
			let targetLanguages = getSelectedTargetLanguages(targetLangCheckboxes);

			let newProject = await projectsController.add(
				title,
				description,
				sourceLanguage,
				targetLanguages
			);

			// hide the modal after the project is created
			$("#newProjectModal").modal("hide");

			// show success message
			showSuccessAlert(
				"New project was created successfully!",
				"You can now add your phrases."
			);

			// reload projects list
			renderProjectsListLoading();
			let user = await loadCurrentUser();
			let reloadedProjects = await loadAllProjectsByUserId(user.ID);
			currentlySelectedProject = newProject;
			renderProjectsList(reloadedProjects);

			// select the new project
			onProjectClicked(currentlySelectedProject.ID);
		} catch (err) {
			handleError(err);
		}
	};
});

function getSelectedSourceLanguage(sourceLangDropdown) {
	let sourceLanguageId = sourceLangDropdown.options[
		sourceLangDropdown.selectedIndex
	].value.substring(3);
	let sourceLanguage = allLanguages.find((lang) => lang.ID === sourceLanguageId);
	return sourceLanguage;
}

function getSelectedTargetLanguages(targetLangCheckboxes) {
	let selectedTargetLanguagesIds = [...targetLangCheckboxes.querySelectorAll("input")]
		.map((elem) => ({
			ID: elem.id.substring(3),
			Checked: elem.checked,
		}))
		.filter((lang) => lang.Checked === true)
		.map((lang) => lang.ID);

	let targetLanguages = selectedTargetLanguagesIds.map((langID) =>
		allLanguages.find((lang) => lang.ID === langID)
	);

	return targetLanguages;
}

// UI Event Handlers

async function onProjectClicked(projectId) {
	renderSelectedProjectLoading();
	currentlySelectedProject = await projectsController.getById(projectId);
	let user = await authenticationController.getAuthenticatedUser();
	let projects = await projectsController.getAllByUserId(user.ID, true);
	renderProjectsList(projects);
	let phrases = await loadAllPhrasesByProjectId(projectId);
	renderProjectDetailsPanel(currentlySelectedProject, phrases);
}

async function onEditButtonClicked() {
	renderSelectedProjectLoading();
	let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
	renderProjectEditPanel(currentlySelectedProject, allLanguages, phrases);
}

async function onSaveButtonClicked() {
	try {
		let titleInput = document.getElementById("projectName");
		let descriptionInput = document.getElementById("projectDescription");
		let sourceLangDropdown = document.getElementById("languageDropdown");
		let targetLangCheckboxes = document.getElementById("targetLanguagesCheckboxes");

		let title = titleInput.value;
		let description = descriptionInput.value;
		let sourceLanguage = getSelectedSourceLanguage(sourceLangDropdown);
		let targetLanguages = getSelectedTargetLanguages(targetLangCheckboxes);

		let updatedProject = await projectsController.updateById(
			currentlySelectedProject.ID,
			title,
			description,
			sourceLanguage,
			targetLanguages
		);

		console.log("the updated project:", updatedProject);

		currentlySelectedProject = updatedProject;

		let projects = await loadAllProjectsByUserId(currentlySelectedProject.UserID);
		renderProjectsList(projects);

		renderSelectedProjectLoading();
		let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
		renderProjectDetailsPanel(currentlySelectedProject, phrases);

		showSuccessAlert("Project was updated successfully!");
	} catch (err) {
		handleError(err);
	}
}

async function onCancelButtonClicked() {
	// show popup with confirmation
	// on confirm, show project-readonly
	renderSelectedProjectLoading();
	let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
	renderProjectDetailsPanel(currentlySelectedProject, phrases);
}

async function onDeleteButtonClicked() {
	try {
		await projectsController.deleteById(currentlySelectedProject.ID);
		let currentUser = await loadCurrentUser();
		let userId = currentUser.ID;

		let projects = await loadAllProjectsByUserId(userId);

		if (projects.length != 0) {
			currentlySelectedProject = projects[0];

			renderProjectsList(projects);

			// show popup with confirmation
			// on confirm, show project-readonly
			renderSelectedProjectLoading();
			let phrases = await loadAllPhrasesByProjectId(currentlySelectedProject.ID);
			renderProjectDetailsPanel(currentlySelectedProject, phrases);
		} else {
			currentlySelectedProject = null;
			renderProjectsList([]);
			renderProjectDetailsPanel(null);
		}

		showSuccessAlert("Project was deleted!");
	} catch (err) {
		handleError(err);
	}
}

async function onAddPhraseButtonPressed() {
	try {
		let phraseText = document.getElementById("newPhraseText").value;
		document.getElementById("newPhraseText").value = "";

		let newPhrase = await phrasesController.add(phraseText, currentlySelectedProject.ID);

		var newPhraseHTML = getEditablePhraseHTML(newPhrase);
		let phrasesListParentElement = document.getElementById("editablePhrasesList");
		phrasesListParentElement.insertAdjacentHTML("afterbegin", newPhraseHTML);

		showSuccessAlert("Phrase added!");
	} catch (err) {
		handleError(err);
	}
}

async function onSavePhraseButtonPressed(phraseId) {
	try {
		let phraseText = document.getElementById(`phrText_${phraseId}`).value;

		let updatedPhrase = await phrasesController.updateById(
			phraseId,
			phraseText,
			currentlySelectedProject.ID
		);

		document.getElementById(`phrText_${phraseId}`).value = updatedPhrase.Text;

		showSuccessAlert("Phrase updated");
	} catch (err) {
		handleError(err);
	}
}
async function onDeletePhraseButtonPressed(phraseId) {
	try {
		let phraseElement = document.getElementById(`phr_${phraseId}`);

		await phrasesController.deleteById(phraseId);

		phraseElement.parentNode.removeChild(phraseElement);

		showSuccessAlert("Phrase deleted!");
	} catch (err) {
		handleError(err);
	}
}

function showSuccessAlert(title, message = "") {
	const id = "successAlert";
	$(`#${id}`).remove();
	$(`#content`).append(alertUtils.createSuccessAlert(id, title, message));
}

// API Calls

async function loadCurrentUser() {
	let currentUser = await authenticationController.getAuthenticatedUser();
	return currentUser;
}

async function loadAllProjectsByUserId(userId) {
	let projects = await projectsController.getAllByUserId(userId, true);
	return projects;
}

async function loadAllLanguages() {
	let languages = await languagesController.getAll();
	languages.sort((l1, l2) => l1.Name.localeCompare(l2.Name, "en", { sensitivity: "base" }));
	return languages;
}

async function loadAllPhrasesByProjectId(projectId) {
	let phrases = await phrasesController.getAllByProjectId(projectId);
	phrases.sort((p1, p2) => p1.Text.localeCompare(p2.Text, "en", { sensitivity: "base" }));
	return phrases;
}

// HTML Rendering Methods

function renderProjectsListLoading() {
	renderLoading("projectsList");
}

function renderSelectedProjectLoading() {
	renderLoading("selectedProjectDetails");
}

function renderProjectsList(projects) {
	let projectsList = document.getElementById("projectsList");
	let projectsListHTML = "";

	if (projects.length === 0) {
		projectsListHTML = `<div>No projects yet.</div>`;
	} else {
		for (let proj of projects) {
			let selected = false;

			if (currentlySelectedProject !== null) {
				selected = proj.ID === currentlySelectedProject.ID;
			}

			let projectHTML = getProjectListItemHTML(proj, selected);
			projectsListHTML += projectHTML;
		}
	}

	projectsList.innerHTML = projectsListHTML;
}

function getProjectListItemHTML(project, selected = false) {
	let id = `project_${project.ID}`;
	let active = selected ? "active" : "";
	let projectHTML = `<a id="${id}" class="list-group-item list-group-item-action ${active}" onclick="onProjectClicked('${project.ID}')">${project.Name}</a>`;
	return projectHTML;
}

function renderProjectDetailsPanel(project, phrases) {
	let projectElement = document.getElementById("selectedProjectDetails");
	
	if (project === null || project === undefined) {
		projectElement.innerHTML = `
		<div><small>Select a project to display its details.</small></div>
		`;
		return;
	}

	let title = getProjectTitleHTML(project.Name);
	let descr = getProjectDescriptionHTML(project.Description);
	let sourceLang = getProjectSourceLanguageHTML(project.SourceLanguage);
	let targetLangs = getProjectTargetLanguagesHTML(project.TargetLanguages);
	//let phrasesList = renderPhrasesListForProjectDetailsPanel(phrases);

	let projectHTML = `
    <div id="projectDetails" class="">
        <div class="d-flex mb-3">
            <button id="editProjectButton" class="d-flex flex-fill align-items-center btn btn-info rounded shadow-none" onclick="onEditButtonClicked()">
                <span class="">Edit project</span><span class="flex-fill"></span><span class="material-icons">edit</span>
            </button>
        </div>

        <div id="projectTitle" class="text-justify"><a href="translation-tool.html?projectId=${project.ID}">${title}</a></div>

        <div id="projectDescription" class="text-justify">${descr}</div>

        <div class="text-capitalize lead mt-3">Source language</div>
        <div id="projectSourceLanguage">${sourceLang}</div>

        <div class="text-capitalize lead mt-3">Target languages</div>
        <div id="projectTargetLanguages">${targetLangs}</div>

        ${getEditeablePhrasesListAndInputHTML(phrases)}
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
	
	let count = targetLanguages.length;
	let targetLanguagesAcordionHTML = `
	<div id="targetLangsAcordion">
		<div class="card">
			<div class="card-header p-0">
				<h5 class="mb-0">
					<button class="btn btn-link text-lowercase" data-toggle="collapse" data-target="#targetLanguagesCollapse">
						${count} ${(count === 1) ? "language" : "languages"}
					</button>
				</h5>
			</div>

			<div id="targetLanguagesCollapse" class="collapse show" data-parent="#targetLangsAcordion">
				<div class="card-body">${targetLanguagesHTML}</div>
			</div>
		</div>
		</div>
	`;

	return targetLanguagesAcordionHTML;
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
                    <div id="targetLanguagesCheckboxes" class="row">
                        ${getProjectTargetLanguagesCheckboxes(
							allLangauges,
							project.TargetLanguages
						)}
                    </div>
                </div>
            </div>
        </div>

        ${getSaveCancelAndDeleteButtonsHTML()}
    </div>
    `;

	let projectElement = document.getElementById("selectedProjectDetails");
	projectElement.innerHTML = projectEditForm;
}

function getProjectNameInputHTML(name) {
	return `<input id="projectName" class="form-control rounded" type="text" value="${name}" placeholder="Enter project title">`;
}

function getProjectDescriptionInputHTML(description) {
	return `<textarea id="projectDescription" class="form-control rounded" rows="5" placeholder="Enter project's description">${description}</textarea>`;
}

function getProjectSourceLanguageOptions(languages, selectedLanguageId = undefined) {
	var optionsHTML = ``;

	for (let language of languages) {
		let selected =
			selectedLanguageId !== undefined && language.ID === selectedLanguageId
				? `selected`
				: ``;

		optionsHTML += `<option value="sl_${language.ID}" ${selected}>${language.Name}</option>`;
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
            <input  id="tl_${lang.ID}" type="checkbox" class="custom-control-input" ${checked}>
            <label for="tl_${lang.ID}" class="custom-control-label">${lang.Name}</label>
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

function getEditeablePhrasesListAndInputHTML(phrases) {
	return `
    <div>
        <div>
            <h4 class="mt-5 mb-3">Phrases</h4>
            <!-- The input field and add button for new phrases -->
            <div id="addNewPhraseInput" class="mb-3">
                <textarea id="newPhraseText" class="form-control shadow-none mb-1" rows="2" placeholder="Enter new phrase"></textarea>
                <div class="d-flex bd-highlight align-items-center">
                    <span class="flex-fill bd-highlight"></span>
                    <button id="submitPhraseButton" class="btn btn-primary shadow-none" onclick='onAddPhraseButtonPressed()'>Add phrase</button>
                </div>
            </div>
        </div>

        <div id="editablePhrasesList" class="my-5">
            ${getEditablePhrasesList(phrases)}
        </div>
    </div>
    `;
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
		let phraseHTML = getEditablePhraseHTML(p);
		phraseListHTML += phraseHTML;
	}

	return phraseListHTML;
}

function getEditablePhraseHTML(phrase) {
	return `
        <div id='phr_${phrase.ID}' class="phraseEditInputs form-group input-group border m-0 my-1">
            <textarea id='phrText_${
				phrase.ID
			}' type="text" class="form-control shadow-none" rows="2">${escapeCharacters(
		phrase.Text
	)}</textarea>
            <div class="input-group-append">
                <button class="input-group-text btn btn-sm shadow-none material-icons-outlined py-4 px-3 text-success" onclick='onSavePhraseButtonPressed("${
					phrase.ID
				}")'>save</button>
            </div>
            <div class="input-group-append">
                <button class="input-group-text btn btn-sm shadow-none material-icons-outlined py-4 px-3 text-danger" onclick='onDeletePhraseButtonPressed("${
					phrase.ID
				}")'>delete</button>
            </div>
        </div>
        `;
}

function renderModalContent(languages = []) {
	return `
    <div>
        <!-- Project name input -->
        <div class="form-group ">
            <input id="modalProjectName" class="form-control rounded" type="text" value="" placeholder="Enter project title">
        </div>
        
        <!-- Project description input -->
        <div class="form-group">
            <textarea id="modalProjectDescription" class="form-control rounded" rows="5" placeholder="Enter project's description"></textarea>
        </div>

        <!-- Project source langauge input  -->
        <div class="form-group">
            <div class="d-flex align-items-baseline">
                <label for="modalLanguageDropdown" class="text-nowrap">Source language</label>
                <select id="modalLanguageDropdown" class="flex-fill form-control rounded ml-2 py-1">
                    ${getProjectSourceLanguageOptions(languages)}
                </select>
            </div>
        </div>

        <!-- Project target languages input -->
        <div class="form-group">
            <div>Target languages</div>
            <div class="resizeablePanel border rounded">
                <div class="container">
                    <div id="modalTargetLanguagesCheckboxes" class="row">
                        ${getProjectTargetLanguagesCheckboxes(languages)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
