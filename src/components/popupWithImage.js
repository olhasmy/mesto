import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._formImgZoom = this._popup.querySelector('.form__img');
        this._formTitleZoom = this._popup.querySelector('.form__title_zoom');
    }

    open(data) {
        super.open();
        this._formImgZoom.src = data.link;
        this._formImgZoom.alt = data.name;
        this._formTitleZoom.textContent = data.name;
    }
}