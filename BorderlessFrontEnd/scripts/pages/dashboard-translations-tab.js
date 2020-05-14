import { projectsController } from "../controllers/projectsController.js";
import { phrasesController } from "../controllers/phrasesController.js";
import { translationsController } from "../controllers/translationsController.js";
import { authenticationController } from "../controllers/authenticationController.js";

document.addEventListener("DOMContentLoaded", async () => {
	let currentUser = await authenticationController.getAuthenticatedUser();
	let userId = currentUser.ID;

	let currentUserTranslations = await translationsController.getAllByUserId(userId);

	let translationData = [];

	for (let translation of currentUserTranslations) {
		let phrase = await phrasesController.getById(translation.PhraseID);
		let project = await projectsController.getById(phrase.ProjectID);

		translationData.push({
			Translation: translation,
			Phrase: phrase,
			Project: project,
		});
	}

	renderTranslationsTable(translationData);
});

function renderTranslationsTable(translationData) {
	let table = document.getElementById("translationsTableBody");
	let tableRowsHTML = ``;

    translationData.sort((td1, td2) => 
        td1.Project.Name.localeCompare(td2.Project.Name, "en", { sensitivity: "base" })
    );

	for (let td of translationData) {
		tableRowsHTML += getTranslationsTableRowHTML(td);
	}

	table.innerHTML = tableRowsHTML;
}

function getTranslationsTableRowHTML(translationData) {
	let projectId = translationData.Project.ID;
	let title = translationData.Project.Name;
	let phraseId = translationData.Phrase.ID;
	let phrase = translationData.Phrase.Text;
	let sourceLang = translationData.Project.SourceLanguage.Abbreviation;
    let targetLang = translationData.Project.TargetLanguages
        .find((tl) => tl.ID === translationData.Translation.LanguageID)
        .Abbreviation;
	let translation = translationData.Translation.Text;

	return `
    <tr>
        <td style="width: 30%"><a href="project.html?projectId=${projectId}">${title}</a></td>
        <td style="width: 30%"><a href="translation-tool.html?projectId=${projectId}&phraseId=${phraseId}">${phrase}</a></td>
        <td style="width: 10%">${sourceLang} > ${targetLang}</td>
        <td style="width: 30%">${translation}</td>
    </tr>
    `;
}
