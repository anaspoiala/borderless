export const alertUtils = (() => {
    
    function createSuccessAlert(id, title, message) {
        let div = $("<div>");
        div.attr("id", id);
        div.addClass("alertContainer");
        div.html(_getAlertContent("alert-success", title, message));

		return div;
    }

    function createDangerAlert(id, errorTitle, errorMessage) {
		let div = $("<div>");
        div.attr("id", id);
        div.addClass("alertContainer");
        div.html(_getAlertContent("alert-danger", errorTitle, errorMessage));

		return div;
	}

    function _getAlertContent(type, errorTitle, errorMessage) {
        return `
        <div class="container alert ${type} alert-dismissible fade show mb-0" role="alert">
            <h5 class="alert-heading">${errorTitle}</h5>
            ${errorMessage}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        </div>
        `
    }

	return {
        createSuccessAlert,
        createDangerAlert,
	};
})();
