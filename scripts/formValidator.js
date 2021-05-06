export class FormValidator {
    constructor(validationConfig, formElement) {
        this.validationConfig = validationConfig;
        this._formElement = formElement;
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

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.validationConfig.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.validationConfig.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this.validationConfig.inputSelector));
        const buttonElement = this._formElement.querySelector(this.validationConfig.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._formElement.addEventListener('submit', (e)=>
        {
            e.preventDefault()}
            )
    }
}