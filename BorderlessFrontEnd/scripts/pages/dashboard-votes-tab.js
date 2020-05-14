import { projectsController } from "../controllers/projectsController.js";
import { phrasesController } from "../controllers/phrasesController.js";
import { usersController } from "../controllers/usersController.js";
import { votesController } from "../controllers/votesController.js";
import { translationsController } from "../controllers/translationsController.js";
import { authenticationController } from "../controllers/authenticationController.js";

document.addEventListener("DOMContentLoaded", async () => {
	let currentUser = await authenticationController.getAuthenticatedUser();
	let userId = currentUser.ID;

	let currentUserVotes = await votesController.getAllByUserId(userId);

	let voteData = [];

	for (let vote of currentUserVotes) {
		let translation = await translationsController.getById(vote.TranslationID);
		let phrase = await phrasesController.getById(translation.PhraseID);
		let project = await projectsController.getById(phrase.ProjectID);
		let translationAuthor = await usersController.getById(translation.UserID);

		voteData.push({
			Vote: vote,
			Translation: translation,
			Phrase: phrase,
			Project: project,
			TranslationAuthor: translationAuthor,
		});
	}

	renderVotesTable(voteData);
});

function renderVotesTable(voteData) {
	let table = document.getElementById("votesTableBody");
	let tableRowsHTML = ``;

    voteData.sort((vd1, vd2) => 
        vd1.Project.Name.localeCompare(vd2.Project.Name, "en", { sensitivity: "base" })
    );

	for (let vd of voteData) {
		tableRowsHTML += getVotesTableRowHTML(vd);
	}

	table.innerHTML = tableRowsHTML;
}

function getVotesTableRowHTML(voteData) {
	let projectId = voteData.Project.ID;
	let title = voteData.Project.Name;
	let phraseId = voteData.Phrase.ID;
	let phrase = voteData.Phrase.Text;
	let sourceLang = voteData.Project.SourceLanguage.Abbreviation;
	let targetLang = voteData.Project.TargetLanguages
        .find((tl) => tl.ID === voteData.Translation.LanguageID)
        .Abbreviation;
	let translation = voteData.Translation.Text;
	let author = voteData.TranslationAuthor.Username;
	let vote = voteData.Vote.IsUpvote ? "thumb_up_alt" : "thumb_down_alt";

	return `
    <tr>
        <td style="width: 25%"><a href="project.html?projectId=${projectId}">${title}</a></td>
        <td style="width: 30%"><a href="translation-tool.html?projectId=${projectId}&phraseId=${phraseId}">${phrase}</a></td>
        <td style="width: 5%">${sourceLang} > ${targetLang}</td>
        <td style="width: 30%">${translation}</td>
        <td style="width: 5%">${author}</td>
        <td style="width: 5%"><span class="material-icons">${vote}</span></td>
    </tr>
    `;
}
