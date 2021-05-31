import {popupDeleteImg} from "../utils/constants";

export default class Card {
    constructor(cardData, cardSelector, handleCardClick, handleDeleteCardClick, owner, currentUser) {
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._owner = owner;
        this._currentUser = currentUser;
        this._id = cardData.id;
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

        if(this._owner === this._currentUser) {
            this._element.querySelector('.element__trash').classList.toggle('element__trash-visible')
        }

        return this._element;
    }

    _makeEventListeners() {
        const likeBtn = this._element.querySelector('.element__like');
        const removeCard = this._element.querySelector('.element__trash');
        const cardImage = this._element.querySelector('.element__img');


        removeCard.addEventListener('click', () => this._handleDeleteCardClick(this));


        likeBtn.addEventListener('click', () => this._like());
        cardImage.addEventListener('click', () => this._handleCardClick(this._cardData.name,this._cardData.link));

    }

    getId(){
        return this._id;
    }

    _like() {
        const likeBtn = this._cardElement.querySelector('.element__like');
        likeBtn.classList.toggle('element__like_active');
    }

    _delete() {
        this._cardElement.remove();
    }

    generateCard() {
        return this._cardElement;
    }
} 
 