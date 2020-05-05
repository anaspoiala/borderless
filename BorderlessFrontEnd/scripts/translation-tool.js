// State data
let currentProjectId = null;
let currentPhraseId = null;
let currentLanguageId = null;
let cachedPhrases = [];

// --------------------------

document.addEventListener("ApiLoaded", async () => {
	// try to get projectId param and validate is it a guid, otherwise redirect to 404.html
	const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	let queryParams = getQueryParams();
	if (guidRegex.test(queryParams.projectId)) {
		currentProjectId = queryParams.projectId;
	} else {
		window.location = "404.html";
	}

	await getAndRenderProject(currentProjectId);

	let submitTranslationButton = document.getElementById("submitTranslationButton");
	submitTranslationButton.onclick = async () => {
		let translationText = document.getElementById("newTranslationText").value;

		let newTranslation = await api.addTranslation(
			translationText,
			currentPhraseId,
			currentLanguageId
		);

		await loadAndRenderTranslations();
	};
});

// State Change Methods

async function getAndRenderProject(projectId) {
	let project = await api.getProjectById(projectId);

	renderProjectTitle(project.Name);

	renderLoadingPhrases();
	currentPhraseId = null;

	let projectSourceLanguage = await loadSourceLanguage(projectId);
	let projectTargetLanguages = await loadTargetLanguages(projectId);

	currentLanguageId = projectTargetLanguages[0].ID;

	renderProjectLanguages(projectSourceLanguage, projectTargetLanguages);

	cachedPhrases = await loadPhrases(projectId);

	if (cachedPhrases.length > 0) {
		updateCurrentPhrase(cachedPhrases[0].ID);
		renderPhrasesList(cachedPhrases);
	} else {
		let contentElem = document.getElementById("content");
		contentElem.innerHTML = `<div class="col">This project currently has no phrases.</div>`;
	}
}

async function updateCurrentPhrase(phraseId) {
	if (currentPhraseId === phraseId) return;

	currentPhraseId = phraseId;

	let currentPhrase = await loadCurrentPhrase(currentPhraseId);
	renderCurrentPhrase(currentPhrase);

	await loadAndRenderTranslations();
}

async function updateLanguage(languageId) {
	if (currentLanguageId === languageId) return;
	currentLanguageId = languageId;

	await loadAndRenderTranslations();
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

function swapIcons(target, clicked) {
	target.classList.toggle("material-icons", clicked);
	target.classList.toggle("material-icons-outlined", !clicked);
}

function wasClicked(target) {
	return (clicked = target.classList.contains("material-icons"));
}

function setVoteButtons(translationId, upvoted, downvoted) {
	let upvoteBtn = document.getElementById(`upvote_${translationId}`);
	let downvoteBtn = document.getElementById(`downvote_${translationId}`);

	if (upvoted && !downvoted) {
		// upvote button filled, downvote outlined
		swapIcons(upvoteBtn, true);
		swapIcons(downvoteBtn, false);
	} else if (downvoted && !upvoted) {
		// downvote button filled, upvote outlined
		swapIcons(upvoteBtn, false);
		swapIcons(downvoteBtn, true);
	} else {
		// both buttons outlined
		swapIcons(upvoteBtn, false);
		swapIcons(downvoteBtn, false);
	}
}

async function updateTranslationById(translationId) {
	let translationElement = document.getElementById(`transl_${translationId}`);

	let reloadedTranslation = await api.getTranslationById(translationId);
	let translationData = await getTranslationDataFromTranslation(reloadedTranslation);

	translationElement.innerHTML = renderTranslationHTML(false, translationData);
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

async function onVoteButtonClicked(target, translationId) {
	let upvoteBtn = document.getElementById(`upvote_${translationId}`);
	let downvoteBtn = document.getElementById(`downvote_${translationId}`);

	let wasUpvoted = wasClicked(upvoteBtn);
	let wasDownvoted = wasClicked(downvoteBtn);

	let upvoteClicked = upvoteBtn.id === target.id;
	let downvoteClicked = downvoteBtn.id === target.id;

	if (upvoteClicked) {
		if (wasUpvoted) {
			await api.deleteVote(translationId);
			setVoteButtons(translationId, false, false);
		} else if (wasDownvoted) {
			await api.updateVote(translationId, true);
			setVoteButtons(translationId, true, false);
		} else {
			await api.addVote(translationId, true);
			setVoteButtons(translationId, true, false);
		}
	} else if (downvoteClicked) {
		if (wasUpvoted) {
			await api.updateVote(translationId, false);
			setVoteButtons(translationId, false, true);
		} else if (wasDownvoted) {
			await api.deleteVote(translationId);
			setVoteButtons(translationId, false, false);
		} else {
			await api.addVote(translationId, false);
			setVoteButtons(translationId, false, true);
		}
	}

	await updateTranslationById(translationId);
}

function onEditTranslationButtonClicked(translationData) {
	let translationDiv = document.getElementById(`transl_${translationData.TranslationId}`);
	translationDiv.innerHTML = getEditeableTranslationHTML(translationData);
}

function onCancelEditTranslationButtonClicked(translationData) {
	let translationDiv = document.getElementById(`transl_${translationData.TranslationId}`);
	translationDiv.innerHTML = getReadOnlyTranslationHTML(translationData);
}

async function onSaveEditedTranslationButtonClicked(translationData) {
	// send updated translation to server
	// on success, swap button icons from (save, cancel) to (edit, delete)
	// replace textarea with translation text
	let updText = document.getElementById(`updTransl_${translationData.TranslationId}`).value;
	let translationDiv = document.getElementById(`transl_${translationData.TranslationId}`);

	let updTranslation = await api.updateTranslation(translationData.TranslationId, updText);

	translationDiv.innerHTML = getReadOnlyTranslationHTML({
		TranslationId: updTranslation.ID,
		TranslationText: updTranslation.Text,
		NumberOfVotes: await api.getNumberOfVotesByTranslationId(updTranslation.ID),
		User: translationData.User,
		Role: translationData.Role,
		Vote: translationData.Vote,
	});
}

async function onDeleteTranslationButtonClicked(translationData) {
	await api.deleteTranslation(translationData.TranslationId);

	let translationDiv = document.getElementById(`transl_${translationData.TranslationId}`);
	translationDiv.parentNode.removeChild(translationDiv);

	// reload all translations
	await loadAndRenderTranslations();
}

// API Calls

async function loadCurrentUser() {
	let currentUser = await api.getCurrentUser();
	return currentUser;
}

async function loadSourceLanguage(projectId) {
	let project = await api.getProjectById(projectId);
	return project.SourceLanguage;
}

async function loadTargetLanguages(projectId) {
	let project = await api.getProjectById(projectId);
	let targetLanguages = project.TargetLanguages;
	targetLanguages.sort((tl1, tl2) =>
		tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
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
		const td = await getTranslationDataFromTranslation(translation);
		translationData.push(td);
	}

	return translationData;
}

async function getTranslationDataFromTranslation(translation) {
	let noOfVotes = await api.getNumberOfVotesByTranslationId(translation.ID);
	let user = await api.getUserById(translation.UserID);
	let role = await api.getUserRoleByTranslationId(translation.ID);
	let currentUserVote = await api.getCurrentUserVote(translation.ID);

	return {
		TranslationId: translation.ID,
		TranslationText: translation.Text,
		NumberOfVotes: noOfVotes,
		User: user,
		Role: role,
		Vote: currentUserVote,
	};
}

// HTML Rendering Methods

function renderProjectTitle(projectName) {
	let projectTitleElem = document.getElementById("projectTitle");
	projectTitleElem.innerHTML = `${escapeCharacters(projectName)}`;
}

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

	let phraseHTML = `<a class='list-group-item list-group-item-action ${activeClass}' onclick='onPhraseClicked("${
		phrase.ID
	}")'>${escapeCharacters(phrase.Text)}</a>`;
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
			TranslationId: <string>
			TranslationText: <string>,
			NumberOfVotes: <int>,
			User: <object>,
			Role: <string>,
			Vote: <object>
		},
		...
	]
*/
function renderTranslationsVotesAndUsers(translationData, edit = false) {
	let translationsList = document.getElementById("translationsList");
	let translationsListHTML = "";

	if (translationData.length == 0) {
		translationsListHTML = `
		<span>No translations yet.</span>
		`;
	} else {
		for (let td of translationData) {
			translationsListHTML += ` 
			<div id='transl_${td.TranslationId}' class='border mt-2 p-2'>
				${renderTranslationHTML(edit, td)}
			</div>
			`;
		}
	}

	translationsList.innerHTML = translationsListHTML;
}

function renderTranslationHTML(edit, td) {
	return edit ? getEditeableTranslationHTML(td) : getReadOnlyTranslationHTML(td);
}

function getReadOnlyTranslationHTML(td) {
	let plusOrMinus = td.NumberOfVotes >= 0 ? "+" : "-";
	let noOfVotesAbs = Math.abs(td.NumberOfVotes);

	let translationHTML = `<!-- Translation text -->
	<div class='py-2'>${escapeCharacters(td.TranslationText)}</div>
	<hr class='my-1 p-0'/>
	<!-- Translation author and up/down vote buttons -->
	<div class='d-flex bd-highlight align-items-center'>
		<span><small>added by </small><span>${escapeCharacters(td.User.Username)}</span></span>
		<span class='flex-fill bd-highlight'></span>
		${getButtonsByRole(td)}
		${getVoteButtons(td, plusOrMinus, noOfVotesAbs)}
	</div>`;

	return translationHTML;
}

function getEditeableTranslationHTML(td) {
	let roleButtonsHTML = getButtonsByRole(td, true);

	let translationHTML = `<!-- Translation text -->
	<div class='py-2'>
		<textarea id='updTransl_${
			td.TranslationId
		}' class='form-control mb-1' rows='2' placeholder='Enter translation'>${escapeCharacters(
		td.TranslationText
	)}</textarea>
	</div>
	<hr class='my-1 p-0'/>
	<!-- Translation author and up/down vote buttons -->
	<div class='d-flex bd-highlight align-items-center'>
		<span><small>added by </small><span>${escapeCharacters(td.User.Username)}</span></span>
		<span class='flex-fill bd-highlight'></span>
		${roleButtonsHTML}
	</div>`;

	return translationHTML;
}

function getVoteButtons(td, plusOrMinus, noOfVotes) {
	let classes = `btn btn-secondary btn-sm p-1 mr-1`;

	let upvoteClasses = ``;
	let downvoteClasses = ``;

	if (td.Vote == null) {
		upvoteClasses = `material-icons-outlined`;
		downvoteClasses = `material-icons-outlined`;
	} else if (td.Vote.IsUpvote) {
		upvoteClasses = `material-icons`;
		downvoteClasses = `material-icons-outlined`;
	} else {
		upvoteClasses = `material-icons-outlined`;
		downvoteClasses = `material-icons`;
	}

	let buttonsHTML = `
	<span class='mx-2'>${plusOrMinus}${noOfVotes}</span>
	<button id='upvote_${td.TranslationId}' class='${upvoteClasses} ${classes}' onclick='onVoteButtonClicked(event.target, "${td.TranslationId}")'>thumb_up_alt</button>
	<button id='downvote_${td.TranslationId}' class='${downvoteClasses} ${classes}' onclick='onVoteButtonClicked(event.target, "${td.TranslationId}")'>thumb_down_alt</button>
	`;

	return buttonsHTML;
}

function getButtonsByRole(translationData, edit = false) {
	let classes = `material-icons-outlined md-18 btn btn-secondary btn-sm p-1 ml-1`;

	switch (translationData.Role) {
		case "PROJECT_OWNER":
			return `
			<!-- Project owner buttons -->
			<button class="${classes}" onclick="">delete</button>
			`;
		case "TRANSLATION_AUTHOR": {
			let params = escapeJSObject(translationData);
			if (!edit) {
				return `<!-- Translation author buttons -->
					<button class='${classes} text-muted'  onclick='onEditTranslationButtonClicked(${params})' >edit</button>
					<button class='${classes} text-danger' onclick='onDeleteTranslationButtonClicked(${params})' >delete</button>
					`;
			}

			return `<!-- Translation author buttons -->
				<button class='${classes} text-success' onclick='onSaveEditedTranslationButtonClicked(${params})' >save</button>
				<button class='${classes} text-muted'   onclick='onCancelEditTranslationButtonClicked(${params})' >cancel</button>
				`;
		}
		case "REGULAR_USER":
		default:
			return ``;
	}
}

function renderLoadingPhrases() {
	renderLoading("phrasesList");
}

function renderLoadingTranslations() {
	renderLoading("translationsList");
}
