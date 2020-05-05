document.addEventListener("ApiLoaded", async () => {
    let currentUser = await loadCurrentUser();
    let userId = currentUser.ID;

    let currentUserVotes = await api.getAllVotesByUserId(userId);

    let voteData = [];

    for (let vote of currentUserVotes) {
        let translation = await api.getTranslationById(vote.TranslationID);
        let phrase = await api.getPhraseById(translation.PhraseID);
        let project = await api.getProjectById(phrase.ProjectID);
        let translationAuthor = await api.getUserById(translation.UserID);

        voteData.push({
            Vote: vote,
            Translation: translation,
            Phrase: phrase,
            Project: project,
            TranslationAuthor: translationAuthor
        });
    }

    renderVotesTable(voteData);
});



function renderVotesTable(voteData) {
    let table = document.getElementById("votesTableBody");
    let tableRowsHTML = ``;

    for (let vd of voteData) {
        tableRowsHTML += getVotesTableRowHTML(vd);
    }

    table.innerHTML = tableRowsHTML;
}

function getVotesTableRowHTML(voteData) {
    let projectId = voteData.Project.ID;
    let title = voteData.Project.Name;
    let phrase = voteData.Phrase.Text;
    let sourceLang = voteData.Project.SourceLanguage.Abbreviation;
    let targetLangs = voteData.Project.TargetLanguages.map(tl => tl.Abbreviation).join(", ");
    let translation = voteData.Translation.Text;
    let author = voteData.TranslationAuthor.Username;
    let vote = voteData.Vote.IsUpvote ? "thumb_up_alt" : "thumb_down_alt";

    return `
    <tr>
        <td><a href="translation-tool.html?projectId=${projectId}">${title}</a></td>
        <td>${phrase}</td>
        <td>${sourceLang} > ${targetLangs}</td>
        <td>${translation}</td>
        <td>${author}</td>
        <td><span class="material-icons">${vote}</span></td>
    </tr>
    `;
}
