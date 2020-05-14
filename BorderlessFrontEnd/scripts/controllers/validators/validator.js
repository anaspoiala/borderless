import { ValidationError } from '../errors/validationError.js';

export const validator = (() => {
    function validateGuid(guid) {
        const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!guidRegex.test(guid))
            throw new ValidationError(`Invalid GUID. (${guid})`);
    }
    
    function validateUsername(username) {
        if (username.length < 4 || username.length > 32) 
            throw new ValidationError("Username has an invalid length. Must be between 4 and 32 characters.");
	}

	function validatePassword(password) {
        if (password.length < 6 || password.length > 32) 
            throw new ValidationError("Password has an invalid length. Must be between 6 and 32 characters.");

		const atLeastOneLetter = /[a-zA-Z]+/;
        if (password.match(atLeastOneLetter) === null) 
            throw new ValidationError("Password is invalid. Must contain at least one uppercase or lowercase letter.");

		const atLeastOneNumber = /[0-9]+/;
        if (password.match(atLeastOneNumber) === null)
            throw new ValidationError("Password is invalid. Must contain at least one number.");
	}

	function validateEmail(email) {
		const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        if (email.match(emailPattern) === null) 
            throw new ValidationError("Email is not valid.");
    }

    function validateProjectTitle(title) {
		if (title === null || title === undefined || title.length === 0)
			throw new ValidationError("Project title must not be empty.");
	}

	function validateProjectDescription(description) {
		if (description === null || description === undefined || description.length === 0)
			throw new ValidationError("Project description must not be empty.");
	}

	function validateProjectLanguages(sourceLanguage, targetLanguages) {
		if (sourceLanguage === null || sourceLanguage === undefined)
			throw new ValidationError("The project must have a source language.");

		if (
			targetLanguages === null ||
			targetLanguages === undefined ||
			targetLanguages.length === 0
		)
			throw new ValidationError("The project must have target languages.");

		if (targetLanguages.find((tl) => tl.ID === sourceLanguage.ID) !== undefined)
			throw new ValidationError(
				"The list of target languages must not contain the source language."
			);
	}
    
    function validatePhraseText(text) {
        if  (text === null || text === undefined || text.length === 0)
            throw new ValidationError("Phrase text must not be empty.");
    }

    function validateTranslationText(text) {
        if  (text === null || text === undefined || text.length === 0)
            throw new ValidationError("Translation text must not be empty.");
    }

    return {
        validateGuid,
        validateUsername,
        validatePassword,
        validateEmail,
        validateProjectTitle,
        validateProjectDescription,
        validateProjectLanguages,
        validatePhraseText,
        validateTranslationText,
        
    };
})();