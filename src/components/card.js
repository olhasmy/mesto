import {deleteImgBtn, popupDeleteImg} from "../utils/constants.js";

export default class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this._handleCardClick = handleCardClick;
        this._cardData = cardData;
        this._cardSelector = cardSelector;
        this._cardElement = this._makeElement();
        this._makeEventListeners();
    }

    _getTemplate() {
        const cardElement =
            this._cardSelector
            .content
            .querySelector('.element__container')
            .cloneNode(true);
        return cardElement;
    }

    _makeElement() {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector('.element__img');
        const cardHeading = this._element.querySelector('.element__text');
        cardHeading.textContent = this._cardData.name;
        cardImage.src = this._cardData.link;
        cardImage.alt = this._cardData.name;

        return this._element;
    }

    _makeEventListeners() {
        const likeBtn = this._element.querySelector('.element__like');
        const cardImage = this._element.querySelector('.element__img');
        const elementTrashBtn = this._element.querySelector('.element__trash');

        //кнопка открытия попапа удаления карточки
        elementTrashBtn.addEventListener('click', () => {
            popupDeleteImg.classList.add('popup_visible');
        });

        likeBtn.addEventListener('click', () => this._like());
        cardImage.addEventListener('click', () => this._handleCardClick(this._cardData.name,this._cardData.link));
    }

    _like() {
        const likeBtn = this._cardElement.querySelector('.element__like');
        const likeCount = this._cardElement.querySelector('.element__like-count');

        likeBtn.classList.toggle('element__like_active');

        if(likeBtn.classList.contains('element__like_active')){
            likeCount.textContent =+1;
        }
    }

   _delete() {
        this._cardElement.remove();
   }

    generateCard() {
        return this._cardElement;
    }
}
