import { projectsController } from "../controllers/projectsController.js";
import { phrasesController } from "../controllers/phrasesController.js";
import { translationsController } from "../controllers/translationsController.js";
import { votesController } from "../controllers/votesController.js";
import { usersController } from "../controllers/usersController.js";
import { renderUtils } from "./utils/renderUtils.js";
import { alertUtils } from "../views/utils/alertUtils.js";
import { handleError } from "../errorHandler.js";

export const translationToolView = (() => {
	const _parentElement = $("#container");
	let _projectId = null;
	let _selectedPhraseId = null;
	let _selectedTargetLanguageId = null;

	async function renderPage(projectId, selectedPhraseId = undefined) {
		_parentElement.empty();
		let { project, phrase } = await _loadProjectAndPhrase(projectId, selectedPhraseId);
		project.TargetLanguages.sort((tl1, tl2) =>
			tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
		);
		_selectedTargetLanguageId = project.TargetLanguages[0].ID;

		let breadcrumbsDiv = renderUtils.createDiv("breadcrumbsDiv", ["row", "lead", "my-3"]);
		let contentDiv = renderUtils.createDiv("content", ["row"]);
		_parentElement.append(breadcrumbsDiv);
		_parentElement.append(contentDiv);

		_renderBreadcrumbs(project, phrase);

		let phrasesColumn = renderUtils.createDiv("phrasesColumn", ["col-md-4"]);
		let selectedPhraseColumn = renderUtils.createDiv("selectedPhraseColumn", ["col-md-8"]);
		contentDiv.append(phrasesColumn);
		contentDiv.append(selectedPhraseColumn);

		_renderSearchBar();

		let phrasesList = renderUtils.createDiv("phrasesList", ["list-group", "mb-3"]);
		phrasesColumn.append(phrasesList);

		let phrases = await phrasesController.getAllByProjectId(_projectId);
		_renderPhrasesList(phrases);

		let languagesDiv = renderUtils.createDiv("languagesDiv");
		let selectedPhraseAndTranslationsDiv = renderUtils.createDiv(
			"selectedPhraseAndTranslationsDiv"
		);
		selectedPhraseColumn.append(languagesDiv);
		selectedPhraseColumn.append(selectedPhraseAndTranslationsDiv);
		_renderLanguagesDropdown(project.SourceLanguage, project.TargetLanguages);

		let translationData = await _loadTranslationsVotesAndUsers();
		_renderSelectedPhraseColumn(phrase, translationData);
	}

	async function _loadProjectAndPhrase(projectId, selectedPhraseId) {
		_projectId = projectId;
		_selectedPhraseId = selectedPhraseId;
		let project = await projectsController.getById(_projectId);
		let phrase =
			_selectedPhraseId === undefined || _selectedPhraseId === null
				? undefined
				: await phrasesController.getById(_selectedPhraseId);
		return { project, phrase };
	}

	function _renderBreadcrumbs(project, phrase) {
		$("#breadcrumbsDiv").empty();
		let breadcrumbElements = [
			renderUtils.createA("", "all-projects.html", "Projects"),
			renderUtils.createA("", `project.html?projectId=${project.ID}`, project.Name),
		];

		if (phrase !== undefined) breadcrumbElements.push(`${phrase.Text}`);

		let breadcrumbs = renderUtils.createBreadcrumbs("", breadcrumbElements, ["col"]);
		$("#breadcrumbsDiv").append(breadcrumbs);
	}

	function _renderSearchBar() {
		let searchbar = renderUtils.createSearchBarWithoutButton(
			"phrasesSearchBar",
			"searchInput",
			"Search phrases",
			_onSearchInputChanged,
			["mb-1"],
			["form-control", "border", "shadow-none"]
		);

		$("#phrasesColumn").append(searchbar);
	}

	async function _onSearchInputChanged() {
		let parent = $(`#phrasesList`);
		renderUtils.displayLoadingText(parent);
		let searchText = $("#searchInput").val().toLowerCase();
		let allPhrases = await phrasesController.getAllByProjectId(_projectId);

		let searchResults;
		if (searchText === "") {
			searchResults = allPhrases;
		} else {
			searchResults = allPhrases.filter((project) =>
				project.Text.toLowerCase().includes(searchText)
			);
		}

		//re-render phrases list with search results
		_renderPhrasesList(searchResults);
	}

	function _renderPhrasesList(phrases) {
		let parent = $("#phrasesList");

		parent.empty();

		if (phrases.length === 0) {
			parent.append(renderUtils.createDiv("").html("No phrases yet."));
			_renderSelectedPhraseColumn();
			return;
		}

		for (let phrase of phrases) {
			let listItem = renderUtils.createAWithoutHref("", escapeCharacters(phrase.Text), [
				"list-group-item",
				"list-group-item-action",
			]);
			if (phrase.ID === _selectedPhraseId) {
				listItem.addClass("active");
			}

			listItem.click(() => {
				_onPhraseClicked(phrase);
			});

			parent.append(listItem);
		}
	}

	async function _onPhraseClicked(phrase) {
		_selectedPhraseId = phrase.ID;

		// change link to match the currently selected phrase
		history.replaceState(
			{},
			"",
			`translation-tool.html?projectId=${_projectId}&phraseId=${_selectedPhraseId}`
		);

		// update breadcrumbs
		let project = await projectsController.getById(_projectId);
		_renderBreadcrumbs(project, phrase);

		let translationData = await _loadTranslationsVotesAndUsers();
		_renderSelectedPhraseColumn(phrase, translationData);

		let phrases = await phrasesController.getAllByProjectId(_projectId);
		_renderPhrasesList(phrases);
	}

	function _renderSelectedPhraseColumn(phrase, translationData) {
		let parent = $("#selectedPhraseAndTranslationsDiv");
		parent.empty();

		if (_selectedPhraseId === undefined) {
			parent.html(
				renderUtils
					.createDiv("", ["my-3"])
					.html("Select a phrase to begin translating this project.")
			);
			return;
		}

		let currentPhraseTextDiv = renderUtils.createDiv("currentPhraseTextDiv");
		let newTranslationDiv = renderUtils.createDiv("newTranslationDiv");
		let translationsDiv = renderUtils.createDiv("translationsDiv");

		parent.append(currentPhraseTextDiv);
		parent.append(newTranslationDiv);
		parent.append($("<hr/>"));
		parent.append(translationsDiv);

		_renderCurrentPhraseText(phrase);
		_renderTranslationTextareaAndSubmitButton();
		_renderTranslationsList(translationData);
	}

	function _renderLanguagesDropdown(sourceLanguage, targetLanguages) {
		let parent = $("#languagesDiv");

		let div = renderUtils.createDiv("", [
			"d-flex",
			"bd-highlight",
			"align-items-center",
			"mb-1",
		]);

		let sourceLangSpan = renderUtils
			.createSpan("projectSourceLanguage")
			.html(sourceLanguage.Name);
		let arrowIconSpan = renderUtils.createSpan("", ["material-icons"]).html("chevron_right");
		let targetLangsSpan = renderUtils.createSpan("projectSourceLanguage");

		div.append(sourceLangSpan);
		div.append(arrowIconSpan);
		div.append(targetLangsSpan);

		let targetLangsDropdown = renderUtils.createSelect(
			"languageDropdown",
			_onSelectTargetLanguage,
			["form-control", "shadow-none"]
		);

		targetLangsSpan.append(targetLangsDropdown);

		targetLanguages.sort((tl1, tl2) =>
			tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
		);

		for (let tl of targetLanguages) {
			let option = renderUtils.createOption("", tl.ID, tl.Name);
			targetLangsDropdown.append(option);
		}

		parent.append(div);
	}

	async function _onSelectTargetLanguage() {
		_selectedTargetLanguageId = $("#languageDropdown").val();
		let translationData = await _loadTranslationsVotesAndUsers();
		_renderTranslationsList(translationData);
	}

	function _renderCurrentPhraseText(phrase) {
		let parent = $("#currentPhraseTextDiv");
		let readonlyPhraseTextarea = renderUtils.createTextarea("currentPhraseText", 2, "", true, [
			"form-control",
			"shadow-none",
		]);
		readonlyPhraseTextarea.html(phrase.Text);
		parent.append(readonlyPhraseTextarea);
	}

	function _renderTranslationTextareaAndSubmitButton() {
		let parent = $("#newTranslationDiv");
		let newTranslationTextarea = renderUtils.createTextarea(
			"newTranslationText",
			2,
			"Enter translation",
			false,
			["form-control", "shadow-none", "mb-1"]
		);
		parent.append(newTranslationTextarea);

		let submitButtonDiv = renderUtils.createDiv("", [
			"d-flex",
			"bd-highlight",
			"align-items-center",
		]);
		let emptyFlexSpan = renderUtils.createSpan("", ["flex-fill", "bd-highlight"]);
		let submitButton = renderUtils.createButton(
			"submitTranslationButton",
			"Submit",
			_onSubmitNewTranslationButtonClicked,
			["btn", "btn-primary", "shadow-none"]
		);

		submitButtonDiv.append(emptyFlexSpan);
		submitButtonDiv.append(submitButton);

		parent.append(submitButtonDiv);
	}

	async function _onSubmitNewTranslationButtonClicked() {
		try {
			let translationText = $("#newTranslationText").val();
			$("#newTranslationText").val("");

			let newTranslation = await translationsController.add(
				translationText,
				_selectedPhraseId,
				_selectedTargetLanguageId
			);

			let translationData = await _loadTranslationsVotesAndUsers();
			_renderTranslationsList(translationData);

			_showSuccessAlert("New translation was added.");
		} catch (err) {
			handleError(err, "container");
		}
	}

	function _renderTranslationsList(translationData) {
		translationData.sort((td1, td2) => (td1.NumberOfVotes < td2.NumberOfVotes ? 1 : -1));
		_renderTranslationsVotesAndUsers(translationData);
	}

	async function _loadTranslationsVotesAndUsers() {
		// if no phrase is selected, no translations can be retrieved
		if (_selectedPhraseId === undefined) return [];

		let translations = await translationsController.getAllByPhraseIdAndLanguageId(
			_selectedPhraseId,
			_selectedTargetLanguageId
		);

		let translationData = [];
		for (let translation of translations) {
			const td = await _getTranslationDataFromTranslation(translation);
			translationData.push(td);
		}

		return translationData;
	}

	async function _getTranslationDataFromTranslation(translation) {
		let noOfVotes = await votesController.getNumberOfVotesByTranslationId(translation.ID);
		let user = await usersController.getById(translation.UserID);
		let role = await translationsController.getUserRoleByTranslationId(translation.ID);
		let currentUserVote = await votesController.getCurrentUserVote(translation.ID);

		return {
			TranslationId: translation.ID,
			TranslationText: translation.Text,
			NumberOfVotes: noOfVotes,
			User: user,
			Role: role,
			Vote: currentUserVote,
		};
	}

	function _renderTranslationsVotesAndUsers(translationData, edit = false) {
		let parent = $("#translationsDiv");
		parent.empty();

		if (translationData.length == 0) {
			parent.html(renderUtils.createSpan("").html("No translations yet."));
			return;
		}

		for (let td of translationData) {
			_renderOneTranslation(parent, td, edit);
		}
	}

	function _renderOneTranslation(parent, td, edit = false) {
		let div = renderUtils.createDiv(`transl_${td.TranslationId}`, ["border", "mt-2", "p-2"]);
		parent.append(div);
		if (edit) {
			_renderEditeableTranslation(div, td);
		} else {
			_renderReadOnlyTranslation(div, td);
		}
	}

	function _renderEditeableTranslation(parent, td) {
		let textareaDiv = renderUtils.createDiv("", ["py-2"]);
		let textarea = renderUtils
			.createTextarea(`updTransl_${td.TranslationId}`, 2, "Enter translation", false, [
				"form-control",
				"mb-1",
			])
			.html(td.TranslationText);
		textareaDiv.html(textarea);
		parent.append(textareaDiv);
		parent.append($("<hr class='my-1 p-0'/>"));
		let userAndButtonsDiv = renderUtils.createDiv("", [
			"d-flex",
			"bd-highlight",
			"align-items-center",
		]);
		parent.append(userAndButtonsDiv);

		let usernameSpan = renderUtils
			.createSpan("")
			.html(`<small>added by </small><span>${escapeCharacters(td.User.Username)}</span>`);
		let emptyFlexSpan = renderUtils.createSpan("", ["flex-fill", "bd-highlight"]);

		userAndButtonsDiv.append(usernameSpan);
		userAndButtonsDiv.append(emptyFlexSpan);
		_renderButtonsByRole(td, userAndButtonsDiv, true);
	}

	function _renderReadOnlyTranslation(parent, td) {
		let plusOrMinus = td.NumberOfVotes >= 0 ? "+" : "-";
		let noOfVotesAbs = Math.abs(td.NumberOfVotes);

		let textDiv = renderUtils
			.createDiv("", ["py-2"])
			.html(`${escapeCharacters(td.TranslationText)}`);
		parent.append(textDiv);
		parent.append("<hr class='my-1 p-0'/>");

		let userAndButtonsDiv = renderUtils.createDiv("", [
			"d-flex",
			"bd-highlight",
			"align-items-center",
		]);
		parent.append(userAndButtonsDiv);

		let usernameSpan = renderUtils
			.createSpan("")
			.html(`<small>added by </small><span>${escapeCharacters(td.User.Username)}</span>`);
		let emptyFlexSpan = renderUtils.createSpan("", ["flex-fill", "bd-highlight"]);

		userAndButtonsDiv.append(usernameSpan);
		userAndButtonsDiv.append(emptyFlexSpan);
		_renderButtonsByRole(td, userAndButtonsDiv, false);
		_renderVoteButtons(td, plusOrMinus, noOfVotesAbs, userAndButtonsDiv);
	}

	function _renderButtonsByRole(translationData, parent, edit = false) {
		let classes = [
			"material-icons-outlined",
			"md-18",
			"btn",
			"btn-secondary",
			"btn-sm",
			"p-1",
			"ml-1",
		];
		//let params = escapeJSObject(translationData);
		let saveBtn = renderUtils.createButton(
			"",
			"save",
			() => {
				_onSaveEditedTranslationButtonClicked(translationData);
			},
			classes.concat("text-success")
		);
		let editBtn = renderUtils.createButton(
			"",
			"edit",
			() => {
				_onEditTranslationButtonClicked(translationData);
			},
			classes.concat("text-muted")
		);
		let cancelBtn = renderUtils.createButton(
			"",
			"cancel",
			() => {
				_onCancelEditTranslationButtonClicked(translationData);
			},
			classes.concat("text-muted")
		);
		let deleteBtn = renderUtils.createButton(
			"",
			"delete",
			() => {
				_onDeleteTranslationButtonClicked(translationData);
			},
			classes.concat("text-danger")
		);

		switch (translationData.Role) {
			case "PROJECT_OWNER":
				parent.append(deleteBtn);
				break;
			case "TRANSLATION_AUTHOR": {
				if (!edit) {
					parent.append(editBtn);
					parent.append(deleteBtn);
				} else {
					parent.append(saveBtn);
					parent.append(cancelBtn);
				}
				break;
			}
			case "REGULAR_USER":
			default:
				break;
		}
	}

	function _renderVoteButtons(td, plusOrMinus, noOfVotes, parent) {
		let classes = ["btn", "btn-secondary", "btn-sm", "p-1", "mr-1"];

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

		let votesCountSpan = renderUtils
			.createSpan("", ["mx-2"])
			.html(`${plusOrMinus}${noOfVotes}`);
		let upvoteBtn = renderUtils.createButton(
			`upvote_${td.TranslationId}`,
			"thumb_up_alt",
			() => {
				_onVoteButtonClicked(`upvote_${td.TranslationId}`, td.TranslationId);
			},
			classes.concat(upvoteClasses)
		);

		let downvoteBtn = renderUtils.createButton(
			`downvote_${td.TranslationId}`,
			"thumb_down_alt",
			() => {
				_onVoteButtonClicked(`downvote_${td.TranslationId}`, td.TranslationId);
			},
			classes.concat(downvoteClasses)
		);

		parent.append(votesCountSpan);
		parent.append(upvoteBtn);
		parent.append(downvoteBtn);
	}

	async function _onVoteButtonClicked(buttonId, translationId) {
		// get the vote buttons corresponding to the translation
		let upvoteBtn = $(`#upvote_${translationId}`);
		let downvoteBtn = $(`#downvote_${translationId}`);

		// get which button was already pressed before the click event
		let wasAlreadyUpvoted = _btnWasAlreadyClicked(upvoteBtn);
		let wasAlreadyDownvoted = _btnWasAlreadyClicked(downvoteBtn);

		// detect which vote button was clicked
		let upvoteClicked = upvoteBtn.attr("id") === buttonId;
		let downvoteClicked = downvoteBtn.attr("id") === buttonId;

		// perform action based on which button was already clicked and which button was clicked
		if (upvoteClicked) {
			if (wasAlreadyUpvoted) {
				await votesController.deleteById(translationId);
				_setVoteButtons(translationId, false, false);
			} else if (wasAlreadyDownvoted) {
				await votesController.updateById(translationId, true);
				_setVoteButtons(translationId, true, false);
			} else {
				await votesController.add(translationId, true);
				_setVoteButtons(translationId, true, false);
			}
		} else if (downvoteClicked) {
			if (wasAlreadyUpvoted) {
				await votesController.updateById(translationId, false);
				_setVoteButtons(translationId, false, true);
			} else if (wasAlreadyDownvoted) {
				await votesController.deleteById(translationId);
				_setVoteButtons(translationId, false, false);
			} else {
				await votesController.add(translationId, false);
				_setVoteButtons(translationId, false, true);
			}
		}

		// update only the affected translation
		let translation = await translationsController.getById(translationId);
		let td = await _getTranslationDataFromTranslation(translation);
		_updateOneTranslation(td, false);
	}

	function _updateOneTranslation(td, edit = false) {
		let div = $(`#transl_${td.TranslationId}`);
		div.empty();

		if (edit) {
			_renderEditeableTranslation(div, td);
		} else {
			_renderReadOnlyTranslation(div, td);
		}
	}

	function _btnWasAlreadyClicked(target) {
		return target.hasClass("material-icons");
	}

	function _setVoteButtons(translationId, upvoted, downvoted) {
		let upvoteBtn = $(`#upvote_${translationId}`);
		let downvoteBtn = $(`#downvote_${translationId}`);

		if (upvoted && !downvoted) {
			// upvote button filled, downvote outlined
			_swapVoteIcons(upvoteBtn, true);
			_swapVoteIcons(downvoteBtn, false);
		} else if (downvoted && !upvoted) {
			// downvote button filled, upvote outlined
			_swapVoteIcons(upvoteBtn, false);
			_swapVoteIcons(downvoteBtn, true);
		} else {
			// both buttons outlined
			_swapVoteIcons(upvoteBtn, false);
			_swapVoteIcons(downvoteBtn, false);
		}
	}

	function _swapVoteIcons(target, clicked) {
		target.toggleClass("material-icons", clicked);
		target.toggleClass("material-icons-outlined", !clicked);
	}

	async function _onSaveEditedTranslationButtonClicked(translationData) {
		try {
			// send updated translation to server
			// on success, swap button icons from (save, cancel) to (edit, delete)
			// replace textarea with translation text
			let updText = $(`#updTransl_${translationData.TranslationId}`).val();
			let translationDiv = $(`#transl_${translationData.TranslationId}`);

			let updTranslation = await translationsController.updateById(
				translationData.TranslationId,
				updText
			);

			const updatedTranslationData = {
				TranslationId: updTranslation.ID,
				TranslationText: updTranslation.Text,
				NumberOfVotes: await votesController.getNumberOfVotesByTranslationId(
					updTranslation.ID
				),
				User: translationData.User,
				Role: translationData.Role,
				Vote: translationData.Vote,
			};

			translationDiv.empty();
			_renderReadOnlyTranslation(translationDiv, updatedTranslationData);

			_showSuccessAlert("Translation was updated.");
		} catch (err) {
			handleError(err, "container");
		}
	}

	function _onEditTranslationButtonClicked(translationData) {
		let translationDiv = $(`#transl_${translationData.TranslationId}`);
		translationDiv.empty();
		_renderEditeableTranslation(translationDiv, translationData);
	}

	function _onCancelEditTranslationButtonClicked(translationData) {
		let translationDiv = $(`#transl_${translationData.TranslationId}`);
		translationDiv.empty();
		_renderReadOnlyTranslation(translationDiv, translationData);
	}

	async function _onDeleteTranslationButtonClicked(translationData) {
		try {
			await translationsController.deleteById(translationData.TranslationId);

			// remove html element
			let translationDiv = $(`#transl_${translationData.TranslationId}`);
			translationDiv.remove();

			// reload all translations
			let reloadedTranslationData = await _loadTranslationsVotesAndUsers();
			_renderTranslationsList(reloadedTranslationData);

			_showSuccessAlert("Translation was deleted.");
		} catch (err) {
			handleError(err, "container");
		}
	}

	function _showSuccessAlert(title, message = "") {
		const id = "successAlert";
		$(`#${id}`).remove();
		$(`#container`).append(alertUtils.createSuccessAlert(id, title, message));
	}

	return {
		renderPage,
	};
})();
