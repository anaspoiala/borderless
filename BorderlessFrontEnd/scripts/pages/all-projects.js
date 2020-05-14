import { projectsView } from '../views/projectsView.js';

document.addEventListener("DOMContentLoaded", init);

async function init() {
	await projectsView.renderPage();
}
