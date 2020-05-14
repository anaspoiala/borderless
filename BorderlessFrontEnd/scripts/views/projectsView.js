import { authenticationController } from "../controllers/authenticationController.js";
import { projectsController } from "../controllers/projectsController.js";
import { renderUtils } from "../views/utils/renderUtils.js";

export const projectsView = (() => {
	const _parentElement = $(".container");

	async function renderPage() {
		_parentElement.empty();

		// handle authentication
		await authenticationController.getAuthenticatedUser();

		let pageHeader = renderUtils.createDiv("pageHeader");
		_parentElement.append(pageHeader);

		_renderPageTitle(pageHeader);
		_renderSearchBar();

		let projectsList = renderUtils.createUl("projectsList", ["list-group", "list-group-flush"]);
		_parentElement.append(projectsList);

		renderUtils.displayLoadingText(projectsList);
		let projects = await projectsController.getAll(true);

		_renderListOfProjects(projects, projectsList);
	}

	function _renderPageTitle(parentElement) {
		let h2 = renderUtils.createH2("", "Projects", ["mb-3"]);
		parentElement.append(h2);
	}

	function _renderSearchBar() {
		let searchParentStyles = ["searchBarContainer", "mb-1"];
		let searchInputStyles = ["form-control", "border", "shadow-none"];
		//let searchButtonStyles = ["border", "btn", "shadow-none"];
		let searchBar = renderUtils.createSearchBarWithoutButton(
			"projectsSearchBar",
			"searchInput",
			"Search projects",
			_onSearchInputChanged,
			searchParentStyles,
			searchInputStyles
		);

		_parentElement.append(searchBar);
	}

	async function _onSearchInputChanged() {
		let parent = $(`#projectsList`);
		renderUtils.displayLoadingText(parent);

		let searchText = $("#searchInput").val().toLowerCase();

		console.log(`Searching for "${searchText}"`);

		let allProjects = await projectsController.getAll(true);

		let searchResults;
		if (searchText === "") {
			searchResults = allProjects;
		} else {
			searchResults = allProjects.filter((project) =>
				project.Name.toLowerCase().includes(searchText)
			);
		}

		//re-render projects list with search results
		_renderListOfProjects(searchResults, parent);
	}

	function _renderListOfProjects(projects, listParent) {
		listParent.empty();

		if (projects.length == 0) {
			listParent.html("No projects yet.");
		} else {
			for (let project of projects) {
				let li = _renderProjectListItem(project);
				listParent.append(li);
			}
		}
	}

	function _renderProjectListItem(project) {
		// create HTML elements
		let li = renderUtils.createLi("", ["list-group-item"]);
		let rowDiv = renderUtils.createDiv("", ["row"]);
		let col1Div = renderUtils.createDiv("", ["col-sm-8"]);
		let col2Div = renderUtils.createDiv("", ["col-sm-4"]);
		let projectNameDiv = renderUtils.createDiv("", ["lead"]);
		let projectDescrDiv = renderUtils.createDiv("", ["text-muted", "text-truncate"]);
		let titleLink = renderUtils.createA(
			"",
			`project.html?projectId=${project.ID}`,
			project.Name
		);

		// set values and append HTML elements
		projectNameDiv.append(titleLink);
		projectDescrDiv.html(project.Description);
		col1Div.append(projectNameDiv);
		col1Div.append(projectDescrDiv);
		let targetLanguagesString = _formatTargetLanguages(project.TargetLanguages);
		col2Div.html(`${project.SourceLanguage.Name} > ${targetLanguagesString}`);
		rowDiv.append(col1Div);
		rowDiv.append(col2Div);
		li.append(rowDiv);

		return li;
	}

	function _formatTargetLanguages(targetLanguages) {
		targetLanguages.sort((tl1, tl2) =>
			tl1.Name.localeCompare(tl2.Name, "en", { sensitivity: "base" })
		);

		let length = targetLanguages.length;
		let targetLanguagesString = "";

		if (length == 1) {
			targetLanguagesString = `${targetLanguages[0].Name}`;
		} else if (length == 2) {
			targetLanguagesString = `${targetLanguages[0].Name} and ${targetLanguages[1].Name}`;
		} else {
			let remaining = length - 2;
			targetLanguagesString = `${targetLanguages[0].Name}, ${targetLanguages[1].Name} and ${remaining} others`;
		}

		return targetLanguagesString;
	}

	return {
		renderPage,
	};
})();
