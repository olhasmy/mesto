import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
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

    close() {
        super.close();
        this._form.reset();
    }
}