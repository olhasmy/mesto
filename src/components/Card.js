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
        const removeCard = this._element.querySelector('.element__trash');
        const cardImage = this._element.querySelector('.element__img');

        likeBtn.addEventListener('click', () => this._like());
        removeCard.addEventListener('click', () => this._delete());
        cardImage.addEventListener('click', () => this._handleCardClick(this._cardData.name,this._cardData.link));
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
 