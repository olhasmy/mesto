export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this.closeButton = this._popup.querySelector('.form__close-icon');
        this.popupOverlay = this._popup.querySelector('.overlay');
    }

    open(){
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', (e)=> {
            this._handleEscClose(e);
        });
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(e){
        if (e.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this.closeButton.addEventListener('click',()=> this.close());
        this.popupOverlay.addEventListener('click',()=> this.close());
    }
}