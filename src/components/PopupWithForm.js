import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.popup__submit-button');
        this._saveSubmitButton = this._submitButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',(e)=>{
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            }
        )
    }

    infoAboutLoading(isLoading, loadingMessage = 'Cохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingMessage;
        } else {
            this._submitButton.textContent = this._saveSubmitButton;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }
}