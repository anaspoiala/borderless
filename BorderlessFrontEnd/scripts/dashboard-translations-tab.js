document.addEventListener("ApiLoaded", async () => {
    let currentUser = await loadCurrentUser();
    let userId = currentUser.ID;

    let currentUserTranslations = await api.getAllTranslationsByUserId(userId);

    let translationData = [];

    for (let translation of currentUserTranslations) {
        let phrase = await api.getPhraseById(translation.PhraseID);
        let project = await api.getProjectById(phrase.ProjectID);

        translationData.push({
            Translation: translation,
            Phrase: phrase,
            Project: project
        });
    }

    renderTranslationsTable(translationData);
});



function renderTranslationsTable(translationData) {
    let table = document.getElementById("translationsTableBody");
    let tableRowsHTML = ``;

    for (let td of translationData) {
        tableRowsHTML += getTranslationsTableRowHTML(td);
    }

    table.innerHTML = tableRowsHTML;
}

function getTranslationsTableRowHTML(translationData) {
    let projectId = translationData.Project.ID;
    let title = translationData.Project.Name;
    let phrase = translationData.Phrase.Text;
    let sourceLang = translationData.Project.SourceLanguage.Abbreviation;
    let targetLangs = translationData.Project.TargetLanguages.map(tl => tl.Abbreviation).join(", ");
    let translation = translationData.Translation.Text;

    return `
    <tr>
        <td><a href="translation-tool.html?projectId=${projectId}">${title}</a></td>
        <td>${phrase}</td>
        <td>${sourceLang} > ${targetLangs}</td>
        <td>${translation}</td>
    </tr>
    `;
}

