document.addEventListener("ApiLoaded", init);

async function init() {
	let projectId = "ed232639-41ec-463a-bffa-6248732d5a0c";

	renderLoadingPhrases();
	renderLoadingProjectDetails();

	let project = await loadProjectById(projectId);
	let phrases = await loadPhrasesByProjectId(projectId);
	let user = await loadUserById(project.UserID);

	renderProject(project, user);
	renderPhrases(phrases);
}

// API Calls

async function loadProjectById(projectId) {
	let project = await api.getProjectById(projectId);
	project.TargetLanguages.sort((tl1, tl2) => 
		tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
	);
	return project;
}

async function loadPhrasesByProjectId(projectId) {
	let phrases = await api.getAllPhrasesByProjectId(projectId);
	phrases.sort((p1, p2) => p1.Text.localeCompare(p2.Text, "en", { sensitivity: "base" }));
	return phrases;
}

async function loadUserById(userId) {
	let user = await api.getUserById(userId);
	return user;
}

// HTML Render Methods

function renderProject(project, user) {
	getProjectTitleHTML(project.Name);
	getProjectDescriptionHTML(project.Description);
	renderProjectCreator(user);
	getProjectSourceLanguageHTML(project.SourceLanguage);
	getProjectTargetLanguagesHTML(project.TargetLanguages);
}

function renderPhrases(phrases) {
	let phrasesList = document.getElementById("phrasesList");
	let phrasesHTML = "";

	for (let phrase of phrases) {
		phrasesHTML += `<a href="#" class="list-group-item list-group-item-action">${phrase.Text}</a>`;
	}

	phrasesList.innerHTML = phrasesHTML;
}

function getProjectTitleHTML(title) {
	let projectTitle = document.getElementById("projectTitle");
	projectTitle.innerHTML = `<h2>${title}</h2>`;
}

function getProjectDescriptionHTML(description) {
	let projectDescription = document.getElementById("projectDescription");
	let descriptionHTML = "";
	let paragraphs = description.split("\n");

	for (let p of paragraphs) {
		descriptionHTML += `<div>${p}</div>`;
	}

	projectDescription.innerHTML =  descriptionHTML;
}

function renderProjectCreator(user) {
	let projectCreator = document.getElementById("projectUsername");
	projectCreator.innerHTML = `<div>${user.FirstName} ${user.LastName} (${user.Username})</div>`;
}

function getProjectSourceLanguageHTML(sourceLanguage) {
	let projectSourceLanguage = document.getElementById("projectSourceLanguage");
	projectSourceLanguage.innerHTML = `<div>${sourceLanguage.Name}, ${sourceLanguage.Abbreviation}</div>`;
}

function getProjectTargetLanguagesHTML(targetLanguages) {
	let projectTargetLanguages = document.getElementById("projectTargetLanguages");
	let targetLanguagesHTML = "";

	for (let tl of targetLanguages) {
		targetLanguagesHTML += `<div>${tl.Name}, ${tl.Abbreviation}</div>`;
	}

	projectTargetLanguages.innerHTML =  targetLanguagesHTML;
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
