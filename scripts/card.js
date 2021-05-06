import { openPopup } from './index.js';
import { formImgZoom, formTitleZoom, popupImg } from './constants.js';

export class Card {
    constructor(cardData) {
        this._cardData = cardData;
        this._cardElement = this._makeElement();
        this._makeEventListeners();
    }

    _makeElement() {
        const template = document.querySelector('.element').content;
        const cardElement = template.querySelector('.element__container').cloneNode(true);
        const cardImage = cardElement.querySelector('.element__img');
        const cardHeading = cardElement.querySelector('.element__text');
        cardHeading.textContent = this._cardData.name;
        cardImage.src = this._cardData.link;
        cardImage.alt = this._cardData.name;

        return cardElement;
    }

    _makeEventListeners() {
        const likeBtn = this._cardElement.querySelector('.element__like');
        const removeCard = this._cardElement.querySelector('.element__trash');
        const cardImage = this._cardElement.querySelector('.element__img');

        likeBtn.addEventListener('click', () => this._like());
        removeCard.addEventListener('click', () => this._delete());
        cardImage.addEventListener('click', () => this._preview());
    }

    _like() {
        const likeBtn = this._cardElement.querySelector('.element__like');
        likeBtn.classList.toggle('element__like_active');
    }
    _delete() {
        this._cardElement.remove();
    }

    _preview() {
        openPopup(popupImg);
        formImgZoom.src = this._cardData.link;
        formTitleZoom.textContent = this._cardData.name;
    }

    render() {
        return this._cardElement;
    }
}