export class FormValidator {
    constructor(validationConfig) {
        this.validationConfig = validationConfig;
    }

    _showInputError(formElement, inputElement, errorMessage, validationConfig) {
        const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
        inputElement.classList.add(validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(validationConfig.errorClass);
    }

    _hideInputError(formElement, inputElement, validationConfig) {
        const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(validationConfig.errorClass);
    }

    _checkInputValidity(formElement, inputElement, validationConfig) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
        } else {
            this._hideInputError(formElement, inputElement, validationConfig);
        }
    }

    _toggleButtonState(inputList, buttonElement, validationConfig) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(validationConfig.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(validationConfig.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setEventListeners(formElement, validationConfig) {
        const inputList = Array.from(formElement.querySelectorAll(this.validationConfig.inputSelector));
        const buttonElement = formElement.querySelector(this.validationConfig.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, validationConfig);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, validationConfig);
                this._toggleButtonState(inputList, buttonElement, validationConfig);
            });
        });
    }

    enableValidation(validationConfig) {
        const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
        forms.forEach(formElement => {
            formElement.addEventListener('submit', (e)=>
            { this._preventFormSubmit(e)});
            this._setEventListeners(formElement, validationConfig);
        });
    }

    _preventFormSubmit(e) {
        e.preventDefault();
    }
}

