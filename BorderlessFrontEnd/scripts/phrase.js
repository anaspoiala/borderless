// Dummy state data
let currentUserId = "d7471d38-d89e-45c6-91b6-ab1fe02ecc92";
let currentProjectId = null;
let currentPhraseId = null;
let currentLanguageId = null;

let cachedPhrases = [];

// --------------------------

document.addEventListener("ApiLoaded", async () => {
	/*
		let currentUserId = "d7471d38-d89e-45c6-91b6-ab1fe02ecc92";
		let currentProjectId = "865fac1c-f220-489c-a65d-380d0c7f770f";
		let currentPhraseId = "5f9d35b6-b95a-4fe9-b857-35ce7bf32c89";
		let currentLanguageId = "56f00e50-72a0-4e84-a945-4e25304fc4ca";
	*/

	let projectId = "865fac1c-f220-489c-a65d-380d0c7f770f";

	await updateProject(projectId);
});

// State Change Methods

async function updateProject(projectId) {
	if (currentProjectId === projectId) return;

	currentProjectId = projectId;
	currentPhraseId = null;

	renderLoadingPhrases();

	let projectSourceLanguage = await loadSourceLanguage(currentProjectId);
	let projectTargetLanguages = await loadTargetLanguages(currentProjectId);

	currentLanguageId = projectTargetLanguages[0].ID;

	renderProjectLanguages(projectSourceLanguage, projectTargetLanguages);

	cachedPhrases = await loadPhrases(currentProjectId);

	if (cachedPhrases.length > 0) {
		updateCurrentPhrase(cachedPhrases[0].ID);
		renderPhrasesList(cachedPhrases);
	}
}

async function updateCurrentPhrase(phraseId) {
	if (currentPhraseId === phraseId) return;

	currentPhraseId = phraseId;

	let currentPhrase = await loadCurrentPhrase(currentPhraseId);
	renderCurrentPhrase(currentPhrase);

	loadAndRenderTranslations();
}

async function updateLanguage(languageId) {
	if (currentLanguageId === languageId) return;
	currentLanguageId = languageId;

	loadAndRenderTranslations();
}

// Helper Methods

async function loadAndRenderTranslations() {
	renderLoadingTranslations();

	let phraseId = currentPhraseId;

	let translationData = await loadTranslationsVotesAndUsers(currentPhraseId, currentLanguageId);

	if (phraseId !== currentPhraseId) {
		return; // current phrase id might have changed, don't render invalid data
	}

	renderTranslationsVotesAndUsers(translationData);
}

// UI Event Handlers

async function onLanguageSelected(languageId) {
	await updateLanguage(languageId);
}

async function onPhraseClicked(phraseId) {
	await updateCurrentPhrase(phraseId);
	// Re-render the list of phrases to select the new current phrase
	renderPhrasesList(cachedPhrases);
}

// For button icon change on click (when connected to backend)
// 		const outline = true;
// 		element.classList.toggle("material-icons-outlined", outline);
// 		element.classList.toggle("material-icons", !outline);
function swapIcon(target){
	let clicked = target.classList.contains("material-icons");
	target.classList.toggle("material-icons-outlined", clicked);
	target.classList.toggle("material-icons", !clicked);
}

// API Calls

async function loadSourceLanguage(projectId) {
	let project = await api.getProjectById(projectId);
	return project.SourceLanguage;
}

async function loadTargetLanguages(projectId) {
	let project = await api.getProjectById(projectId);
	let targetLanguages = project.TargetLanguages;
	targetLanguages.sort(
		(tl1, tl2) => tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
	);

	return targetLanguages;
}

async function loadPhrases(currentProjectId) {
	let phrases = await api.getAllPhrasesByProjectId(currentProjectId);
	phrases.sort((p1, p2) => p1.Text.localeCompare(p2.Text, "en", { sensitivity: "base" }));
	return phrases;
}

async function loadCurrentPhrase(currentPhraseId) {
	return await api.getPhraseById(currentPhraseId);
}

async function loadTranslationsVotesAndUsers(currentPhraseId, currentLanguageId) {
	let translations = await api.getAllTranslationsByPhraseIdAndLanguageId(
		currentPhraseId,
		currentLanguageId
	);
	let translationData = [];

	for (let translation of translations) {
		let noOfVotes = await api.getNumberOfVotesByTranslationId(translation.ID);
		let user = await api.getUserById(translation.UserID);

		translationData.push({
			TranslationText: translation.Text,
			NumberOfVotes: noOfVotes,
			User: user,
		});
	}

	return translationData;
}

// HTML Rendering Methods

function renderPhrasesList(phrases) {
	let phrasesList = document.getElementById("phrasesList");
	let phrasesListHTML = "";

	for (let phrase of phrases) {
		let phraseHTML = renderPhraseListItem(phrase);
		phrasesListHTML += phraseHTML;
	}

	phrasesList.innerHTML = phrasesListHTML;
}

function renderPhraseListItem(phrase) {
	let activeClass = "";
	if (phrase.ID === currentPhraseId) {
		activeClass = "active";
	}

	let phraseHTML = `<a class="list-group-item list-group-item-action ${activeClass}" onclick="onPhraseClicked('${phrase.ID}')">${phrase.Text}</a>`;
	return phraseHTML;
}

function renderProjectLanguages(projectSourceLanguage, projectTargetLanguages) {
	let sourceLanguageSpan = document.getElementById("projectSourceLanguage");
	let targetLanguageDropdown = document.getElementById("languageDropdown");
	let targetLanguageDropdownHTML = ``;

	for (let tl of projectTargetLanguages) {
		let optionHTML = `<option value="${tl.ID}">${tl.Name}</option>`;
		targetLanguageDropdownHTML += optionHTML;
	}

	sourceLanguageSpan.innerHTML = projectSourceLanguage.Name;
	targetLanguageDropdown.innerHTML = targetLanguageDropdownHTML;
}

function renderCurrentPhrase(currentPhrase) {
	let currentPhraseText = document.getElementById("currentPhraseText");
	currentPhraseText.innerHTML = currentPhrase.Text;
}

/* translationData = [
		{
			TranslationText: <string>,
			NumberOfVotes: <int>,
			User: <object>
		},
		...
	]
*/
function renderTranslationsVotesAndUsers(translationData) {
	let translationsList = document.getElementById("translationsList");
	let translationsListHTML = "";

	if (translationData.length == 0) {
		translationsListHTML = `
		<span>No translations yet</span>
		`;
	} else {
		for (let td of translationData) {
			let plusOrMinus = td.NumberOfVotes >= 0 ? "+" : "-";
			let noOfVotesAbs = Math.abs(td.NumberOfVotes);

			let translationHTML = `
			<div class="border mt-1 p-2">
				<div class="py-2">${td.TranslationText}</div>
				<hr class="my-1 p-0"/>
				<div class="d-flex bd-highlight align-items-center">
					<span><small>added by </small><span>${td.User.Username}</span></span>
					<span class="flex-fill bd-highlight"></span>
					<span class="mx-2">${plusOrMinus}${noOfVotesAbs}</span>
					<button class="material-icons-outlined btn btn-secondary btn-sm p-1 mr-1" onclick="swapIcon(event.target)">thumb_up_alt</button>
					<button class="material-icons-outlined btn btn-secondary btn-sm p-1 ml-1" onclick="swapIcon(event.target)">thumb_down_alt</button>
				</div>
			</div>
			`;

			translationsListHTML += translationHTML;
		}
	}

	translationsList.innerHTML = translationsListHTML;
}

function renderLoadingPhrases() {
	renderLoading("phrasesList");
}

function renderLoadingTranslations() {
	renderLoading("translationsList");
}

