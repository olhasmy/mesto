export default class Card {
    constructor(cardData, cardSelector, userId, handleCardClick, handleDeleteCardClick, handleLikeClick) {
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._owner = cardData.owner._id;
        this._userId = userId;
        this._id = cardData._id;
        this._card = cardData;
        this.handleLikeClick = handleLikeClick;
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
        this._cardImage = this._element.querySelector('.element__img');
        this._cardHeading = this._element.querySelector('.element__text');
        this._likeBtn = this._element.querySelector('.element__like');
        this._countElement = this._element.querySelector('.element__like-count');

        this._cardHeading.textContent = this._card.name;
        this._cardImage.src = this._card.link;
        this._cardImage.alt = this._card.name;

        if(this._owner === this._userId) {
            this._element.querySelector('.element__trash').classList.toggle('element__trash-visible')
        }

        this._countElement.textContent = this._card.likes.length;

        this._isLiked = this._card.likes.some(like => like._id === this._userId);
        if(this._isLiked) {
            this._likeBtn.classList.add('element__like_active')
        }

        return this._element;
    }

    _makeEventListeners() {
        const likeBtn = this._element.querySelector('.element__like');
        const removeCard = this._element.querySelector('.element__trash');
        const cardImage = this._element.querySelector('.element__img');

        removeCard.addEventListener('click', () => this._handleDeleteCardClick(this));
        likeBtn.addEventListener('click', () => this._like());
        cardImage.addEventListener('click', () => this._handleCardClick(this._card.name,this._card.link));
    }

    _like(){
        this.handleLikeClick(this);
    }

    getId(){
        return this._id;
    }

    getIsLiked(){
        return this._isLiked;
    }

    deleteCard(){
        this._element.remove();
    }

    generateCard() {
        return this._cardElement;
    }

    updateLikesInfo(likes){
        this._card.likes = likes;
        this._countElement.textContent = this._card.likes.length;
        this._isLiked = this._card.likes.some(like => like._id === this._userId);
        if(this._isLiked) {
            this._likeBtn.classList.add('element__like_active')
        } else  {
            this._likeBtn.classList.remove('element__like_active')
        }
    }
} 
 