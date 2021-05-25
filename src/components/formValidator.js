export class FormValidator {
    constructor(validationConfig, formElement) {
        this.validationConfig = validationConfig;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this.validationConfig.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this.validationConfig.inputSelector));
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}--error`);
        inputElement.classList.add(this.validationConfig.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.validationConfig.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}--error`);
        inputElement.classList.remove(this.validationConfig.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this.validationConfig.errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this.validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this._buttonElement.classList.remove(this.validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setEventListeners() {

        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    removeErrors() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        })
    }

    enableValidation() {
        this._setEventListeners();
        this._formElement.addEventListener('submit', (e)=>
        {
            e.preventDefault()}
            )
    }
}