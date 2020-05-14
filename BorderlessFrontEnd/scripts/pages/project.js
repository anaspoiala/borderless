import { projectsController } from "../controllers/projectsController.js";
import { phrasesController } from "../controllers/phrasesController.js";
import { usersController } from "../controllers/usersController.js";
import { validator } from "../controllers/validators/validator.js";
import { ValidationError } from "../controllers/errors/validationError.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {
	let currentProjectId;
	let queryParams = getQueryParams();
	try {
		validator.validateGuid(queryParams.projectId);
		currentProjectId = queryParams.projectId;

		let btn = document.getElementById("goToTranslationToolButton");
		btn.disabled = true;

		renderLoadingPhrases();
		renderLoadingProjectDetails();

		let project = await loadProjectById(currentProjectId);
		let phrases = await loadPhrasesByProjectId(currentProjectId);
		let user = await loadUserById(project.UserID);

		setButtonEventHandler(btn, project.ID);
		renderProject(project, user);
		renderPhrases(phrases);
	} catch (err) {
		if (err instanceof ValidationError) {
			console.log(`Validation Error: ${err.message}`);
			window.location = "404.html";
		} else {
			console.log(`Error (${err.name}): ${err.message}`);
			window.location = "error.html";
		}
	}
}

// API Calls

async function loadProjectById(projectId) {
	let project = await projectsController.getById(projectId);
	project.TargetLanguages.sort((tl1, tl2) =>
		tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
	);
	return project;
}

async function loadPhrasesByProjectId(projectId) {
	let phrases = await phrasesController.getAllByProjectId(projectId);
	phrases.sort((p1, p2) => p1.Text.localeCompare(p2.Text, "en", { sensitivity: "base" }));
	return phrases;
}

async function loadUserById(userId) {
	let user = await usersController.getById(userId);
	return user;
}

// Event Handlers

function setButtonEventHandler(btn, projectId) {
	btn.addEventListener("click", () => {
		window.location = `translation-tool.html?projectId=${projectId}`
	});
	btn.disabled = false;
}

// HTML Render Methods

function renderProject(project, user) {
	renderProjectTitle(project.Name);
	renderProjectDescription(project.Description);
	renderProjectCreator(user);
	renderProjectSourceLanguage(project.SourceLanguage);
	renderProjectTargetLanguages(project.TargetLanguages);
}

function renderPhrases(phrases) {
	let phrasesList = document.getElementById("phrasesList");
	let phrasesHTML = "";

	for (let phrase of phrases) {
		let href = `translation-tool.html?projectId=${phrase.ProjectID}&phraseId=${phrase.ID}`;
		phrasesHTML += `<a href="${href}" class="list-group-item list-group-item-action">${phrase.Text}</a>`;
	}

	phrasesList.innerHTML = phrasesHTML;
}

function renderProjectTitle(title) {
	let projectTitle = document.getElementById("projectTitle");
	//projectTitle.innerHTML = `<h2>${title}</h2>`;
	projectTitle.innerHTML = `
	<ol class="breadcrumb lead m-0 p-0">
		<li class="breadcrumb-item"><a href="all-projects.html">Projects</a></li>
		<li class="breadcrumb-item active">${title}</li>
  	</ol>`;
}

function renderProjectDescription(description) {
	let projectDescription = document.getElementById("projectDescription");
	let descriptionHTML = "";
	let paragraphs = description.split("\n");

	for (let p of paragraphs) {
		descriptionHTML += `<div>${p}</div>`;
	}

	projectDescription.innerHTML = descriptionHTML;
}

function renderProjectCreator(user) {
	let projectCreator = document.getElementById("projectUsername");
	projectCreator.innerHTML = `<div>${user.FirstName} ${user.LastName} (${user.Username})</div>`;
}

function renderProjectSourceLanguage(sourceLanguage) {
	let projectSourceLanguage = document.getElementById("projectSourceLanguage");
	projectSourceLanguage.innerHTML = `<div>${sourceLanguage.Name}, ${sourceLanguage.Abbreviation}</div>`;
}

function renderProjectTargetLanguages(targetLanguages) {
	let projectTargetLanguages = document.getElementById("projectTargetLanguages");
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

	projectTargetLanguages.innerHTML = targetLanguagesAcordionHTML;
}

function renderLoadingPhrases() {
	renderLoading("phrasesList");
}

function renderLoadingProjectDetails() {
	renderLoading("projectTitle");
	renderLoading("projectDescription");
	renderLoading("projectUsername");
	renderLoading("projectSourceLanguage");
	renderLoading("projectTargetLanguages");
}
