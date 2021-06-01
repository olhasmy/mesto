export default class Card {
    constructor(cardData, cardSelector, currentUser, handleCardClick, handleDeleteCardClick) {
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._owner = cardData.owner._id;
        this._currentUser = currentUser;
        this._id = cardData._id;
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
        likeBtn.addEventListener('click', () => {
            if(likeBtn === 0) {
                this.count()
            }
        })
        cardImage.addEventListener('click', () => this._handleCardClick(this._cardData.name,this._cardData.link));
    }

    count(){
        this._countElement = this._element.querySelector('.element__like-count');
        this._countElement.textContent.add += 1
    }

    getId(){
        return this._id;
    }

    deleteCard(){
        this._element.remove();
    }

    _like() {
        const likeBtn = this._cardElement.querySelector('.element__like');

        likeBtn.classList.toggle('element__like_active');
    }

    generateCard() {
        return this._cardElement;
    }
} 
 