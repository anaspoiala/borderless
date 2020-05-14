export const renderUtils = (() => {
	function displayLoadingText(element) {
		let span = createSpan("");
		span.html("Loading...");
		element.html(span);
	}

	function createButton(id, value, onClick, styles = []) {
		let button = $("<button>");
		button.attr("id", id);
		button.html(value);
		button.click(onClick);
		_addStyles(button, styles);

		return button;
	}

	function createDiv(id, styles = []) {
		let div = $("<div>");
		div.attr("id", id);
		_addStyles(div, styles);

		return div;
	}

	function createSpan(id, styles = []) {
		let span = $("<span>");
		span.attr("id", id);
		_addStyles(span, styles);

		return span;
	}

	function createH2(id, value, styles = []) {
		let h2 = $("<h2>");
		h2.attr("id", id);
		h2.html(value);
		_addStyles(h2, styles);

		return h2;
	}

	function createInput(id, type, placeholder, styles = []) {
		let input = $("<input>");
		input.attr("id", id);
		input.attr("type", type);
		input.attr("placeholder", placeholder);
		_addStyles(input, styles);

		return input;
	}

	function createTextarea(id, rows, placeholder, readonly = false, styles = []) {
		let textarea = $("<textarea>");
		textarea.attr("id", id);
		textarea.attr("rows", rows);
		textarea.attr("placeholder", placeholder);
		textarea.attr("readonly", readonly);
		_addStyles(textarea, styles);

		return textarea;
	}

	function createSelect(id, onSelect, styles = []) {
		let select = $("<select>");
		select.attr("id", id);
		select.on("change", onSelect);
		_addStyles(select, styles);

		return select;
	}

	function createOption(id, value, displayValue, styles = []) {
		let option = $("<option>");
		option.attr("id", id);
		option.attr("value", value);
		option.html(displayValue);
		_addStyles(option, styles);

		return option;
	}

	function createUl(id, styles = []) {
		let ul = $("<ul>");
		ul.attr("id", id);
		_addStyles(ul, styles);

		return ul;
	}

	function createOl(id, styles = []) {
		let ol = $("<ul>");
		ol.attr("id", id);
		_addStyles(ol, styles);

		return ol;
	}

	function createLi(id, styles = []) {
		let li = $("<li>");
		li.attr("id", id);
		_addStyles(li, styles);

		return li;
	}

	function createA(id, href, value, styles = []) {
		let a = $("<a>");
		a.attr("id", id);
		a.attr("href", href);
		a.html(value);
		_addStyles(a, styles);

		return a;
	}

	function createAWithoutHref(id, value, styles = []) {
		let a = $("<a>");
		a.attr("id", id);
		a.html(value);
		_addStyles(a, styles);

		return a;
	}

	function createSearchBarWithButton(
		id,
		inputId,
		buttonId,
		placeholder,
		buttonOnClick,
		parentStyles = [],
		inputStyles = [],
		buttonStyles = []
	) {
		let searchDiv = createDiv(id, parentStyles);
		let searchInput = createInput(inputId, "text", placeholder, inputStyles);
		let searchButton = createButton(buttonId, "Search", buttonOnClick, buttonStyles);

		searchDiv.append(searchInput);
		searchDiv.append(searchButton);

		return searchDiv;
	}

	function createSearchBarWithoutButton(
		id,
		inputId,
		placeholder,
		onInput,
		parentStyles = [],
		inputStyles = []
	) {
		let searchDiv = createDiv(id, parentStyles);
		let searchInput = createInput(inputId, "text", placeholder, inputStyles);
		searchInput.on("input", onInput);

		searchDiv.append(searchInput);

		return searchDiv;
	}

	function createBreadcrumbs(id, elements, parentStyles = []) {
		let breadcrumbsParent = renderUtils.createDiv(id, parentStyles);
		let breadcrumbList = renderUtils.createOl("", ["breadcrumb", "m-0", "p-0"]);

		for (let element of elements) {
			let item = renderUtils.createLi("", ["breadcrumb-item"]);
			item.html(element);
			breadcrumbList.append(item);
		}

		breadcrumbList.children().last().addClass("active");

		breadcrumbsParent.append(breadcrumbList);
		return breadcrumbsParent;
	}

	function _addStyles(element, styles) {
		for (let style of styles) {
			element.addClass(style);
		}
	}

	return {
		displayLoadingText,
		createButton,
		createDiv,
		createSpan,
		createH2,
		createInput,
		createTextarea,
		createSelect,
		createOption,
		createUl,
		createOl,
		createLi,
		createA,
		createAWithoutHref,
		createSearchBarWithButton,
		createSearchBarWithoutButton,
		createBreadcrumbs,
	};
})();
