import { ValidationError } from "./controllers/errors/validationError.js";
import { alertUtils } from "./views/utils/alertUtils.js";

export function handleError(err, parentElementIdForAlert = "content") {
	if (err instanceof ValidationError) {
		$("#dangerAlert").remove(); // remove existing alert, if any
		let alert = alertUtils.createDangerAlert("dangerAlert", "Invalid data!", err.message);
		$(`#${parentElementIdForAlert}`).append(alert);
	} else {
		console.log(`Error (${err.name}): ${err.message}`);
		window.location = "error.html";
	}
}
